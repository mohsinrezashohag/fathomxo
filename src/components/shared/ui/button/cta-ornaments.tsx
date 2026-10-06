import { cn } from '@/src/utils/cn';

/**
 * The starter's hero-button badge: a disc holding an arrow that sits at 45
 * degrees and swings flat on hover. Kept as its own piece because both the
 * accent and the ghost CTA carry it, only the two colours differ.
 */
export function CtaArrow({
  discClassName,
  arrowClassName,
}: Readonly<{ discClassName?: string; arrowClassName?: string }>) {
  return (
    <span className="relative ml-1 grid size-10 shrink-0 place-items-center" aria-hidden>
      <span
        className={cn(
          'ease-brand absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-110',
          discClassName
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        className={cn(
          'ease-brand relative rotate-45 transition-transform duration-400 group-hover:rotate-0',
          arrowClassName
        )}
      >
        <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7H17V17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* Negative delays spread the three rings evenly across one 4.8s cycle, so the
   halo is already rippling outward on first paint. Widths stay under 121% or the
   two hero CTAs' outer rings collide in the gap between them. */
const HALO_RINGS = [
  'h-[68px] w-[106%]',
  'h-[84px] w-[113%] [animation-delay:-1.6s]',
  'h-[100px] w-[120%] [animation-delay:-3.2s]',
] as const;

/**
 * Three concentric rings around a hero CTA, breathing slowly so the accent
 * reads as a light source rather than a static outline. `.cta-halo` carries the
 * keyframe and its reduced-motion off switch; see src/styles/common.css.
 *
 * Siblings of the button, never children: the pill clips its own overflow to
 * mask the split-text roll, and the rings have to escape that box.
 */
export function CtaHalo({ ringClassNames }: Readonly<{ ringClassNames: readonly string[] }>) {
  return (
    <>
      {HALO_RINGS.map((size, index) => (
        <span
          key={size}
          className={cn(
            'cta-halo pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border',
            size,
            ringClassNames[index]
          )}
          aria-hidden
        />
      ))}
    </>
  );
}
