'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

/**
 * `depth` is the pointer parallax range in pixels and `tilt` the rotation range
 * in degrees. They differ per sphere on purpose: equal values move the field as
 * one flat plane, and the whole illusion is that they sit at different distances.
 */
const SPHERES = [
  {
    id: 'left',
    className: 'top-[16%] -left-[14%] size-[clamp(230px,34vw,500px)]',
    floatClassName: '[animation-delay:-1.4s]',
    depth: 72,
    tilt: 16,
  },
  {
    id: 'centre',
    className: 'top-[-8%] left-[44%] size-[clamp(150px,23vw,340px)]',
    floatClassName: '[animation-delay:-5.2s] [animation-duration:11s]',
    depth: 44,
    tilt: 11,
  },
  {
    id: 'right',
    className: 'top-[44%] -right-[12%] size-[clamp(240px,36vw,520px)]',
    floatClassName: '[animation-delay:-3.1s] [animation-duration:10s]',
    depth: 96,
    tilt: 20,
  },
] as const;

/** Fraction of a sphere's box that counts as "the pointer is on it". */
const PROXIMITY = 0.42;

const HeroDotField = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const shellRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const field = fieldRef.current;
      if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const shells = shellRefs.current.filter((shell): shell is HTMLSpanElement => Boolean(shell));
      if (!shells.length) return;

      const movers = shells.map((shell) => ({
        x: gsap.quickTo(shell, 'x', { duration: 0.75, ease: 'power3.out' }),
        y: gsap.quickTo(shell, 'y', { duration: 0.75, ease: 'power3.out' }),
        rotationX: gsap.quickTo(shell, 'rotationX', { duration: 0.75, ease: 'power3.out' }),
        rotationY: gsap.quickTo(shell, 'rotationY', { duration: 0.75, ease: 'power3.out' }),
      }));

      /* offsetLeft/offsetTop, not getBoundingClientRect: the shells carry a live
         GSAP transform, so a bounding rect would feed each frame's own parallax
         back into the next one and the spheres would drift away from the pointer. */
      let centres = shells.map((shell) => ({
        x: shell.offsetLeft + shell.offsetWidth / 2,
        y: shell.offsetTop + shell.offsetHeight / 2,
        radius: shell.offsetWidth * PROXIMITY,
      }));
      const measure = () => {
        centres = shells.map((shell) => ({
          x: shell.offsetLeft + shell.offsetWidth / 2,
          y: shell.offsetTop + shell.offsetHeight / 2,
          radius: shell.offsetWidth * PROXIMITY,
        }));
      };

      /* Proximity, not :hover. The hero's content column sits above the field and
         swallows the pointer across its whole box, transparent or not, so
         pointerenter on a sphere only ever fired in the margins. Distance to the
         sphere's centre answers the question the hover was meant to ask. */
      const near = shells.map(() => false);

      const onPointerMove = (event: PointerEvent) => {
        const rect = field.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        const nx = px / rect.width - 0.5;
        const ny = py / rect.height - 0.5;

        movers.forEach((mover, index) => {
          const { depth, tilt } = SPHERES[index];
          mover.x(nx * depth);
          mover.y(ny * depth);
          mover.rotationY(nx * tilt);
          mover.rotationX(-ny * tilt);

          const centre = centres[index];
          const isNear = Math.hypot(px - centre.x, py - centre.y) < centre.radius;
          if (isNear === near[index]) return;

          near[index] = isNear;
          gsap.to(shells[index], {
            scale: isNear ? 1.1 : 1,
            duration: isNear ? 1.2 : 0.6,
            ease: isNear ? 'elastic.out(1, 0.35)' : 'power3.out',
          });
        });
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', measure);
      };
    },
    { scope: fieldRef }
  );

  return (
    <div
      ref={fieldRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [perspective:1200px]"
      aria-hidden
    >
      {SPHERES.map((sphere, index) => (
        <span
          key={sphere.id}
          ref={(node) => {
            shellRefs.current[index] = node;
          }}
          className={`absolute rounded-full [transform-style:preserve-3d] ${sphere.className}`}
        >
          <span className={`dot-sphere block size-full rounded-full ${sphere.floatClassName}`} />
        </span>
      ))}
    </div>
  );
};

export default HeroDotField;
