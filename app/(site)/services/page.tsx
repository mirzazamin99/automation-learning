import type { Metadata } from "next";
import BookButton from "../../components/BookButton";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Services | Dr. Aamir",
  description:
    "How to work with Dr. Aamir: a single session, a structured coaching engagement, ongoing practice, or a speaking and organizational session.",
};

const SERVICES = [
  {
    n: "01",
    name: "Single Session",
    format: "One conversation, 60–90 minutes",
    body: "For a specific decision that's stuck, a fork in the road with a deadline attached. One focused conversation, one clear next move by the end of it. No ongoing commitment.",
  },
  {
    n: "02",
    name: "Coaching Engagement",
    format: "Structured, multi-week",
    body: "The core offering: the Listen → Clarify → Choose → Build process, run end to end. For a real change you want built properly rather than rushed: a role, a relationship, a direction, a body of work.",
  },
  {
    n: "03",
    name: "Ongoing Practice",
    format: "Recurring, open-ended",
    body: "For after the engagement, or for someone who already knows their direction and wants a standing thinking partner to keep it honest. Regular sessions, no fixed end date.",
  },
  {
    n: "04",
    name: "Speaking & Organizational Sessions",
    format: "Conferences, offsites, team sessions",
    body: "For organizations that want more than a lecture. Dr. Aamir speaks at national and international conferences and leads live sessions built to create a real experience for the room, not just deliver information.",
  },
];

export default function Services() {
  return (
    <main>
      <section className="mx-auto max-w-[900px] px-6 pt-16 pb-16 text-center md:px-12 md:pt-28 md:pb-24">
        <Reveal>
          <h1 className="mx-auto max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.08] font-medium tracking-[-0.02em] text-foreground">
            Ways to work together.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground-dim md:text-xl">
            Every engagement starts the same way, a conversation about where
            you actually are. Which format fits is usually clear within the
            first few minutes of that call.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[900px] px-6 pb-24 md:px-12 md:pb-36">
        <div className="divide-y divide-edge border-t border-edge">
          {SERVICES.map((service, i) => (
            <Reveal key={service.n} delay={i * 80}>
              <div className="py-12 md:py-16">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-tabular font-display text-base text-accent-text">
                    {service.n}
                  </span>
                  <h2 className="font-display text-2xl font-medium text-foreground md:text-3xl">
                    {service.name}
                  </h2>
                  <span className="text-sm font-medium text-foreground-faint">
                    {service.format}
                  </span>
                </div>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-foreground-dim md:text-lg">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-[52ch] text-center text-sm leading-relaxed text-foreground-faint">
          Pricing depends on format and is set on your consultation call.
          Nothing is charged before that conversation.
        </p>
      </section>

      <section className="bg-cta-band">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:px-12 md:py-36">
          <p className="mx-auto max-w-[20ch] font-display text-3xl leading-[1.15] font-medium text-paper md:text-5xl">
            Start with a conversation, not a commitment.
          </p>
          <div className="mt-10 flex justify-center">
            <BookButton />
          </div>
        </div>
      </section>
    </main>
  );
}
