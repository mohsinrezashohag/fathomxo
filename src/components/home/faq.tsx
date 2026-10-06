import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import FaqContact from '@/src/components/home/faq-contact';
import {
  Accordion,
  AccordionAction,
  AccordionContent,
  AccordionItem,
} from '@/src/components/shared/ui/accordion';
import { faqCategories, publishedFaqs } from '@/src/data/faqs';

/* The home accordion shows one question from each category: a taste of the FAQ
   page, not a duplicate of it. Content lives in faqs.ts. */
const faqData = faqCategories
  .map((category) => publishedFaqs.find((faq) => faq.category === category))
  .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq))
  .map((faq, index) => ({
    value: `home-faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  }));

const FAQ = () => {
  return (
    <section className="bg-background-6 py-10 md:py-28 lg:py-30 xl:py-40 2xl:py-44">
      <div className="main-container space-y-10 md:space-y-19.5">
        <div className="space-y-1.5 text-center md:space-y-3">
          <TextReveal>
            <h2 className="font-display text-ink mx-auto max-w-[16ch] text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)]">
              questions, meet answers.
              <br />
              <span className="text-ink-faint">no runaround.</span>
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-ink-secondary text-20 mx-auto mt-5 max-w-[52ch] leading-[var(--leading-body)]">
              The things people ask before they send a brief. If yours is not here, ask us directly.
            </p>
          </TextReveal>
        </div>

        <div className="flex flex-col items-start justify-between gap-y-10 overflow-hidden md:items-center lg:flex-row lg:items-start lg:gap-x-10 xl:gap-x-[100px]">
          <RevealAnimation direction="left" offset={100} delay={0.3}>
            <div className="w-full max-w-[595px]">
              <Accordion defaultOpen="item-one" type="single">
                {faqData.map((item) => (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    className="border-stroke-1/10 rounded-lg border px-6"
                  >
                    <AccordionAction>{item.question}</AccordionAction>
                    <AccordionContent contentClassName="font-inter-tight text-tagline-2 max-w-[531px] cursor-text pb-6 font-extralight text-white/50">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </RevealAnimation>

          <FaqContact />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
