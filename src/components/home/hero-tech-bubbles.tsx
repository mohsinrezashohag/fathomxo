'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

/**
 * The technologies the studio works with, drifting around the statement.
 *
 * Positions deliberately avoid the centre column: the headline is the reason the
 * hero exists, and a logo behind a word is a worse hero than no logo at all.
 * `depth` is the pointer parallax range in pixels and rises with bubble size,
 * because a nearer object should travel further than a far one.
 */
const BUBBLES = [
  {
    slug: 'react',
    name: 'React',
    box: 'left-[5%] top-[16%] size-16',
    icon: 'size-[30px]',
    depth: 74,
    float: '',
  },
  {
    slug: 'flutter',
    name: 'Flutter',
    box: 'left-[21%] top-[7%] size-11',
    icon: 'size-[20px]',
    depth: 40,
    float: '[animation-delay:-2.2s]',
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    box: 'left-[14%] top-[35%] size-12',
    icon: 'size-[22px]',
    depth: 52,
    float: '[animation-delay:-5.1s] [animation-duration:12s]',
  },
  {
    slug: 'python',
    name: 'Python',
    box: 'left-[3%] top-[53%] size-14',
    icon: 'size-[26px]',
    depth: 66,
    float: '[animation-delay:-3.4s] [animation-duration:11s]',
  },
  {
    slug: 'docker',
    name: 'Docker',
    box: 'left-[17%] top-[69%] size-11',
    icon: 'size-[20px]',
    depth: 44,
    float: '[animation-delay:-6.3s]',
  },
  {
    slug: 'laravel',
    name: 'Laravel',
    box: 'left-[8%] top-[85%] size-12',
    icon: 'size-[22px]',
    depth: 56,
    float: '[animation-delay:-1.1s] [animation-duration:13s]',
  },
  {
    slug: 'tailwindcss',
    name: 'Tailwind CSS',
    box: 'left-[27%] top-[91%] size-10',
    icon: 'size-[18px]',
    depth: 34,
    float: '[animation-delay:-4.7s]',
  },
  {
    slug: 'nextdotjs',
    name: 'Next.js',
    box: 'right-[6%] top-[15%] size-14',
    icon: 'size-[26px]',
    depth: 68,
    float: '[animation-delay:-2.9s] [animation-duration:12s]',
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    box: 'right-[23%] top-[6%] size-10',
    icon: 'size-[18px]',
    depth: 32,
    float: '[animation-delay:-7.2s]',
  },
  {
    slug: 'nodedotjs',
    name: 'Node.js',
    box: 'right-[15%] top-[33%] size-12',
    icon: 'size-[22px]',
    depth: 50,
    float: '[animation-delay:-0.8s] [animation-duration:13s]',
  },
  {
    slug: 'django',
    name: 'Django',
    box: 'right-[24%] top-[45%] size-10',
    icon: 'size-[18px]',
    depth: 30,
    float: '[animation-delay:-5.8s]',
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    box: 'right-[4%] top-[54%] size-16',
    icon: 'size-[30px]',
    depth: 78,
    float: '[animation-delay:-3.9s] [animation-duration:11s]',
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    box: 'right-[17%] top-[70%] size-11',
    icon: 'size-[20px]',
    depth: 42,
    float: '[animation-delay:-6.9s]',
  },
  {
    slug: 'figma',
    name: 'Figma',
    box: 'right-[8%] top-[86%] size-12',
    icon: 'size-[22px]',
    depth: 58,
    float: '[animation-delay:-1.7s] [animation-duration:12s]',
  },
] as const;

/** Fraction of a bubble's box that counts as the pointer being on it. */
const PROXIMITY = 1.6;

const HeroTechBubbles = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const shellRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const field = fieldRef.current;
      if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const shells = shellRefs.current.filter((shell): shell is HTMLSpanElement => Boolean(shell));
      if (!shells.length) return;

      const movers = shells.map((shell) => ({
        x: gsap.quickTo(shell, 'x', { duration: 0.8, ease: 'power3.out' }),
        y: gsap.quickTo(shell, 'y', { duration: 0.8, ease: 'power3.out' }),
      }));

      /* offsetLeft/offsetTop, not getBoundingClientRect: the shells carry a live
         GSAP transform, so a bounding rect would feed each frame's own parallax
         back into the next one and the bubbles would drift off the pointer. */
      const measure = () =>
        shells.map((shell) => ({
          x: shell.offsetLeft + shell.offsetWidth / 2,
          y: shell.offsetTop + shell.offsetHeight / 2,
          radius: shell.offsetWidth * PROXIMITY,
        }));
      let centres = measure();
      const remeasure = () => {
        centres = measure();
      };

      const near = shells.map(() => false);

      const onPointerMove = (event: PointerEvent) => {
        const rect = field.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        const nx = px / rect.width - 0.5;
        const ny = py / rect.height - 0.5;

        movers.forEach((mover, index) => {
          const { depth } = BUBBLES[index];
          mover.x(nx * depth);
          mover.y(ny * depth);

          const centre = centres[index];
          const isNear = Math.hypot(px - centre.x, py - centre.y) < centre.radius;
          if (isNear === near[index]) return;

          near[index] = isNear;
          gsap.to(shells[index], {
            scale: isNear ? 1.22 : 1,
            duration: isNear ? 1.1 : 0.5,
            ease: isNear ? 'elastic.out(1, 0.35)' : 'power3.out',
          });
        });
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', remeasure);

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', remeasure);
      };
    },
    { scope: fieldRef }
  );

  return (
    /* Hidden below md on purpose: at 360px the bubbles would sit on the headline
       rather than around it, and the dot field already carries the small screens. */
    <div
      ref={fieldRef}
      className="pointer-events-none absolute inset-0 z-0 max-md:hidden"
      aria-hidden
    >
      {BUBBLES.map((bubble, index) => (
        <span
          key={bubble.slug}
          ref={(node) => {
            shellRefs.current[index] = node;
          }}
          className={`absolute ${bubble.box}`}
        >
          <span
            className={`tech-bubble border-hairline bg-surface grid size-full place-items-center rounded-full border ${bubble.float}`}
          >
            <Image
              src={`/images/tech/${bubble.slug}.svg`}
              alt=""
              width={32}
              height={32}
              className={bubble.icon}
            />
          </span>
        </span>
      ))}
    </div>
  );
};

export default HeroTechBubbles;
