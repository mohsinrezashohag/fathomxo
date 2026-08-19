import { SocialIcons } from '@/src/components/shared/social-icons';
import { footerSignoff, footerSocials } from '@/src/data/footer';

const BottomBar = () => {
  return (
    <div className="border-hairline flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
      <div className="text-ink-muted flex flex-col items-center gap-1 text-xs sm:items-start">
        <p className="font-mono tracking-[var(--tracking-mono)] uppercase">{footerSignoff}</p>
        <p>&copy; {new Date().getFullYear()} FathomXO. All rights reserved.</p>
      </div>

      <SocialIcons
        links={footerSocials}
        linkClassName="focus-visible:outline-accent rounded focus-visible:outline-2 focus-visible:outline-offset-2"
        iconClassName="stroke-ink-muted hover:stroke-ink transition-colors duration-[var(--dur-hover)]"
      />
    </div>
  );
};

export default BottomBar;
