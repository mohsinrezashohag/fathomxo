import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    /* The case-study covers are first-party SVGs authored in this repo, not
       remote or user-supplied files, so the usual reason to block SVG (a script
       hidden in an untrusted upload) does not apply. The CSP below still
       sandboxes them and forbids scripts, so a mistake in one cannot execute. */
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
