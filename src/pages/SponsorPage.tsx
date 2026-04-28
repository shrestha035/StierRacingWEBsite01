import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useReveal";

const sponsorTiers = [
  {
    name: "Title",
    price: "₹2,50,000 – ₹3,00,000",
    points: [
      "Prominent front logo",
      "Team apparel branding",
      "Pit banner presence",
      "Event banner visibility",
      "Pit equipment branding",
      "12–15 annual reels",
      "15–20 story mentions",
      "Behind-the-scenes content",
      "Competition recap features",
      "Build season coverage",
      "Dedicated sponsor posts",
      "Campus activation access",
      "Race-day promotion",
      "Title branding rights",
    ],
  },
  {
    name: "Platinum",
    price: "₹1,50,000",
    points: [
      "Prominent front logo",
      "Team apparel branding",
      "Pit banner presence",
      "Event banner visibility",
      "Pit equipment branding",
      "8–10 annual reels",
      "10–12 story mentions",
      "Behind-the-scenes content",
      "Competition recap features",
      "Build season coverage",
      "Campus activation access",
    ],
  },
  {
    name: "Gold",
    price: "₹1,00,000",
    points: [
      "Large sidepod logo",
      "Team apparel branding",
      "Pit banner presence",
      "Event banner visibility",
      "6–8 annual reels",
      "8–10 story mentions",
      "Behind-the-scenes content",
      "Competition recap features",
      "Build season coverage",
    ],
  },
  {
    name: "Silver",
    price: "₹75,000",
    points: [
      "Large sidepod logo",
      "Team apparel branding",
      "Pit banner presence",
      "4–6 annual reels",
      "6–8 story mentions",
      "Behind-the-scenes content",
      "Competition recap features",
    ],
  },
  {
    name: "Bronze",
    price: "₹50,000",
    points: [
      "Small logo placement",
      "Team apparel branding",
      "Pit banner presence",
      "2–4 annual reels",
      "3–4 story mentions",
      "Behind-the-scenes content",
    ],
  },
];

const SponsorPage = () => {
  return (
    <div className="min-h-screen grid-bg bg-background text-foreground relative overflow-hidden">
      <div className="absolute top-24 right-10 w-20 h-20 checker opacity-20 hidden md:block" />
      <div className="absolute bottom-20 left-10 w-16 h-16 checker opacity-20 hidden md:block" />

      {/* Top nav */}
      <div className="sticky top-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logofinal_nobg.png`}
              alt="Stier Racing Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="flex flex-col leading-none gap-1">
              <img
                src={`${import.meta.env.BASE_URL}images/stier_racing_no_bg.png`}
                alt="Stier Racing"
                className="h-7 md:h-9 w-auto object-contain"
              />
              <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Ramaiah Institute · EV Formula
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="px-5 py-2 border-2 border-foreground font-heading text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            ← Back Home
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <Reveal from="left">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-foreground" />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">
              Chapter 07 — Sponsor Stier Racing
            </span>
          </div>
        </Reveal>

        <Reveal from="up" delay={120}>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6">
            SPONSOR
            <br />
            STIER<span className="text-primary">.</span>
          </h1>
        </Reveal>

        <Reveal from="up" delay={220}>
          <p className="font-body text-base md:text-lg max-w-3xl text-muted-foreground">
            Choose from our sponsorship packages and partner with Stier Racing to support
            innovation, competition, and student motorsport excellence.
          </p>
        </Reveal>
      </section>

      {/* Sponsor tiers */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-12">
        <div className="space-y-6">
          {sponsorTiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              from={i % 2 === 0 ? "left" : "right"}
              delay={150 + i * 120}
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-foreground">
                <div className="absolute top-4 right-4 w-12 h-12 checker opacity-10 hidden md:block" />

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
                  {/* Left side */}
                  <div className="bg-foreground text-background p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-background/10 flex flex-col justify-center">
                    <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-background/60 mb-3">
                      Tier {i + 1}
                    </p>

                    <h2 className="font-display text-4xl md:text-5xl leading-none mb-4">
                      {tier.name}
                    </h2>

                    <p className="font-display text-primary text-3xl md:text-4xl">
                      {tier.price}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="bg-background p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                      {tier.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <span className="text-primary font-display text-2xl leading-none mt-0.5">
                            {tier.name === "Title"
                              ? "◆"
                              : tier.name === "Platinum"
                              ? "●"
                              : tier.name === "Gold"
                              ? "■"
                              : tier.name === "Silver"
                              ? "▲"
                              : "✦"}
                          </span>
                          <span className="font-body text-base md:text-lg leading-relaxed text-foreground/85">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        id="continue-sponsor"
        className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20 pt-6"
      >
        <Reveal from="up" delay={120}>
          <div className="max-w-3xl border-2 border-foreground rounded-2xl bg-background p-8 md:p-10 relative overflow-hidden">
            <div className="absolute right-6 bottom-6 w-16 h-16 checker opacity-10 hidden md:block" />

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-foreground" />
              <span className="font-heading text-[10px] tracking-[0.4em] uppercase">
                Final Step
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter mb-4">
              LET&apos;S BUILD
              <br />
              TOGETHER<span className="text-primary">.</span>
            </h2>

            <p className="font-body text-base md:text-lg text-muted-foreground mb-8 max-w-2xl">
              Together, we can engineer the future of racing.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Team@stierracing.in&su=Sponsor%20Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 md:px-14 h-14 md:h-16 bg-primary text-primary-foreground border-2 border-primary font-heading text-sm md:text-base tracking-[0.35em] uppercase transition-all hover:bg-black hover:text-white hover:border-black"
            >
              Continue to be our sponsor →
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default SponsorPage;
