'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SmoothScrollingProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: Readonly<SmoothScrollingProps>) => {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(pathname);
  const isInitialRender = useRef(true);

  const lenis = useLenis();

  // Smoothed scroll is inertia the visitor did not ask for. Lenis stays mounted
  // and has its smoothing switched off, rather than being swapped for a
  // fragment: the preference resolves in an effect, so changing the tree shape
  // would remount every child and re-run all GSAP setup on load.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setPrefersReducedMotion(query.matches);
      // Triggers were measured against whichever scroller was active before.
      ScrollTrigger.refresh();
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  // `useSearchParams` used to sit in this effect's deps. It was inert - the
  // guard below compares pathnames, so a query-only change never scrolled - but
  // it forced the whole app past the Suspense boundary to bail out of
  // prerendering, shipping an empty shell on every route.
  useEffect(() => {
    // Only scroll to top if pathname actually changed (navigation), not on initial render or reload
    if (!isInitialRender.current && previousPathnameRef.current !== pathname) {
      lenis?.scrollTo(0, { immediate: true });
    }

    // Update refs
    previousPathnameRef.current = pathname;
    isInitialRender.current = false;
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handleClick = (ele: Element) => {
      lenis.scrollTo(ele.getAttribute('href') ?? '', {
        offset: -100,
      });
    };

    const elements = document.querySelectorAll('.lenis-scroll-to');
    const clickHandler = (e: Event) => handleClick(e.target as Element);

    elements.forEach((ele) => {
      ele.addEventListener('click', clickHandler);
    });

    return () => {
      elements.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
      });
    };
  }, [lenis, pathname]);


  // Lenis and GSAP each run their own RAF loop by default, so ScrollTrigger was
  // reading native scroll while Lenis smoothed a separate position. Driving
  // Lenis from the ticker and updating ScrollTrigger on its scroll event
  // collapses that into one source of truth.
  //
  // This runs under reduced motion too: with smoothing off Lenis adds no
  // easing, but it still needs its loop for scrollTo on route change.
  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', update);
    gsap.ticker.add(raf);
    // Without this GSAP clamps large frame deltas, and Lenis drifts out of step
    // after a backgrounded tab.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', update);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(1000, 33);
    };
  }, [lenis]);

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        duration: 1.1,
        // With these off Lenis passes wheel and touch straight through to the
        // browser, so the page scrolls natively.
        smoothWheel: !prefersReducedMotion,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
