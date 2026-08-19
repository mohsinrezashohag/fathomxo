'use client';

import { useMobileMenuContext } from '@/src/context/MobileMenuContext';

const MobileMenuButton = () => {
  const { openMenu } = useMobileMenuContext();

  return (
    <div className="block lg:hidden">
      <button
        type="button"
        onClick={openMenu}
        className="nav-hamburger focus-visible:outline-accent mr-3 flex size-11 cursor-pointer flex-col items-end justify-center space-y-2 rounded-full pr-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label="Toggle menu"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="bg-ink block h-px w-9" />
        <span className="bg-ink block h-px w-6" />
      </button>
    </div>
  );
};

export default MobileMenuButton;
