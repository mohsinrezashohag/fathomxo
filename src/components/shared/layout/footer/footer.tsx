import symbolMark from '@/src/assets/images/logos/svg/symbol-dark.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import BottomBar from '@/src/components/shared/layout/footer/bottom-bar';
import Wordmark from '@/src/components/shared/wordmark';
import { footerContact, footerGroups, footerTagline } from '@/src/data/footer';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-hairline bg-canvas border-t">
      <div className="max-w-site mx-auto px-5 pt-24 pb-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_repeat(3,1fr)]">
          <div>
            <RevealAnimation direction="up">
              <div>
                <Link
                  href="/"
                  aria-label="FathomXO home"
                  className="focus-visible:outline-accent inline-flex items-center gap-2.5 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="bg-surface-raised grid size-11 place-items-center rounded-full">
                    <Image src={symbolMark} alt="" width={26} height={17} className="w-[26px]" />
                  </span>
                  <span className="font-display text-ink text-xl font-bold tracking-[var(--tracking-display)]">
                    FathomXO
                  </span>
                </Link>

                <p className="text-ink-muted mt-4 max-w-[34ch] text-sm">{footerTagline}</p>

                <address className="text-ink-muted mt-6 space-y-1 text-sm not-italic">
                  <Link
                    href={`mailto:${footerContact.email}`}
                    className="hover:text-ink focus-visible:outline-accent block rounded transition-colors duration-[var(--dur-hover)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {footerContact.email}
                  </Link>
                  <span className="block">{footerContact.location}</span>
                </address>
              </div>
            </RevealAnimation>
          </div>

          {footerGroups.map((group, index) => (
            <div key={group.title}>
              <RevealAnimation direction="up" delay={0.1 * (index + 1)}>
                <div>
                  <h3 className="text-ink-muted mb-4 font-mono text-xs font-normal tracking-[var(--tracking-mono)] uppercase">
                    {group.title}
                  </h3>
                  <ul className="grid gap-3 text-sm">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-ink-secondary hover:text-ink focus-visible:outline-accent inline-block rounded transition-colors duration-[var(--dur-hover)] focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealAnimation>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Wordmark />
        </div>

        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;
