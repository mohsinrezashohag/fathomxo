'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import {
  ChevronRightIcon,
  ContactAddressIcon,
  ContactEmailIcon,
  ContactPhoneIcon,
} from '@/src/components/shared/icon';
import { useButtonSplitText } from '@/src/hooks/use-button-split-text';
import { useRef } from 'react';

const Contact = () => {
  const submitButtonWrapperRef = useRef<HTMLDivElement>(null);
  useButtonSplitText(submitButtonWrapperRef);

  return (
    <section className="border-hairline bg-canvas relative border-t py-20 md:py-24 lg:py-28">
      <div className="main-container relative z-20 space-y-10 md:space-y-12">
        <div className="space-y-2 text-center">
          <TextReveal>
            <h2 className="font-display text-ink mx-auto max-w-[18ch] text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)]">
              tell us what you are building.
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-ink-secondary text-20 mx-auto mt-4 max-w-[54ch] leading-[var(--leading-body)]">
              Scope, budget band, timeline. You get a real number back, usually within a day.
            </p>
          </TextReveal>
        </div>

        <RevealAnimation delay={0.3}>
          <div className="bg-surface border-hairline mx-auto flex max-w-[1290px] flex-col gap-[42px] rounded-[var(--radius-card)] border p-6 sm:p-8 lg:flex-row lg:p-[42px]">
            {/* Contact Method Section */}
            <div className="flex w-full flex-col gap-6 lg:w-[510px]">
              <RevealAnimation delay={0.4} direction="left">
                <div className="bg-background-5 flex flex-col gap-[10px] rounded-lg p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex size-9 items-center justify-center">
                      <ContactEmailIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-it-heading-6 text-white/90">Email</p>
                      <a
                        href="mailto:hello@fathomxo.com"
                        className="text-tagline-2 font-inter-tight text-white/60"
                      >
                        hello@fathomxo.com
                      </a>
                    </div>
                  </div>
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.5} direction="left">
                <div className="bg-background-5 flex flex-col gap-[10px] rounded-lg p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex size-9 items-center justify-center">
                      <ContactPhoneIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-it-heading-6 text-white/90">Phone</p>
                      <a
                        href="tel:+18001234567"
                        className="text-tagline-2 font-inter-tight text-white/60"
                      >
                        +1 800 123 4567
                      </a>
                    </div>
                  </div>
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.6} direction="left">
                <div className="bg-background-5 flex flex-col gap-[10px] rounded-lg p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex size-9 items-center justify-center">
                      <ContactAddressIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-it-heading-6 text-white/90">Address</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.google.com/maps"
                        className="text-tagline-2 font-inter-tight text-white/60"
                      >
                        123 Innovation Street, TechCity, CA 94043
                      </a>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            </div>

            {/* Form Section */}
            <div className="flex flex-1 flex-col gap-[42px]">
              <RevealAnimation delay={0.4}>
                <form className="flex flex-1 flex-col gap-6">
                  <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex items-center gap-1 rounded-lg border px-3 py-3 pl-3 focus-within:outline-none">
                    <input
                      type="text"
                      required
                      id="full-name"
                      placeholder="Full name"
                      className="font-inter-tight text-tagline-2 w-full bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                    />
                  </div>

                  <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex items-center gap-1 rounded-lg border px-3 py-3 pl-3 focus-within:outline-none">
                    <input
                      type="email"
                      required
                      id="email-address"
                      placeholder="Email address"
                      className="font-inter-tight text-tagline-2 w-full bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-5">
                    <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex flex-1 items-center gap-1 rounded-lg border px-3 py-3 pl-3 focus-within:outline-none">
                      <input
                        type="text"
                        required
                        id="company-name"
                        placeholder="Company name"
                        className="font-inter-tight text-tagline-2 w-full bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                      />
                    </div>
                    <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex flex-1 items-center gap-1 rounded-lg border px-3 py-3 pl-3 focus-within:outline-none">
                      <input
                        type="tel"
                        required
                        id="phone"
                        placeholder="Phone"
                        className="font-inter-tight text-tagline-2 w-full bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex items-center gap-1 rounded-lg border px-3 py-3 pl-3 focus-within:outline-none">
                    <input
                      type="text"
                      required
                      id="subject"
                      placeholder="Subject"
                      className="font-inter-tight text-tagline-2 w-full bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                    />
                  </div>

                  <div className="bg-background-6 border-stroke-1/11 focus-within:border-stroke-1 flex flex-1 flex-col gap-4 rounded border px-3 py-2 focus-within:outline-none">
                    <textarea
                      required
                      id="message"
                      placeholder="Your message"
                      rows={6}
                      className="font-inter-tight text-tagline-2 flex-1 resize-none bg-transparent font-normal text-white/60 placeholder:text-white/60 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="w-auto">
                      <div
                        ref={submitButtonWrapperRef}
                        className="button-split-text-wrapper inline-block w-auto"
                      >
                        <div className="group bg-background-7 hover:border-stroke-3 relative flex max-h-12 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-6 py-2! transition-all duration-300 ease-in-out md:py-3!">
                          <div className="relative overflow-hidden">
                            <div className="h-5.5">
                              <div className="text-background-5 font-ibm-plex-mono button-split-upper-text text-tagline-2 block leading-[1.4] font-medium text-nowrap">
                                Submit
                              </div>
                            </div>
                            <div className="absolute h-5.5">
                              <div className="text-background-5 font-ibm-plex-mono button-split-lower-text text-tagline-2 block leading-[1.4] font-medium text-nowrap">
                                Submit
                              </div>
                            </div>
                          </div>
                          <div className="relative mt-[2px] flex size-6 items-center justify-center overflow-hidden">
                            <span className="stroke-background-6 ease-custom-ease-1 absolute size-[18px] translate-x-0 stroke-[1.5px] transition-all duration-500 group-hover:translate-x-6">
                              <ChevronRightIcon className="stroke-background-6 size-[18px] stroke-[1.5px]" />
                            </span>
                            <span className="stroke-background-6 ease-custom-ease-1 absolute size-[18px] -translate-x-6 stroke-[1.5px] transition-all duration-500 group-hover:translate-x-0">
                              <ChevronRightIcon className="stroke-background-6 size-[18px] stroke-[1.5px]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </form>
              </RevealAnimation>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Contact;
