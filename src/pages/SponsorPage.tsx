import { Link } from "react-router-dom";

const sponsorTiers = [
  {
    name: "Title",
    price: "INR 15L+",
    highlight: true,
    points: [
      "Naming rights for our car and labs",
      "Access to the technology we develop",
      "Access to testing data",
      "Access to the institute's testing facilities",
      "Stalls at all events we attend",
      "Branding on vehicle and jersey",
      "Branding on various avenues & social platforms",
    ],
  },
  {
    name: "Diamond",
    price: "INR 10L+",
    points: [
      "Access to the technology we develop",
      "Access to testing data",
      "Access to the institute's testing facilities",
      "Stalls at all events we attend",
      "Branding on vehicle and jersey",
      "Branding on various avenues & social platforms",
    ],
  },
  {
    name: "Platinum",
    price: "INR 5L+",
    points: [
      "Access to testing data",
      "Access to the institute's testing facilities",
      "Stalls at all events we attend",
      "Branding on vehicle and jersey",
      "Branding on various avenues & social platforms",
    ],
  },
  {
    name: "Gold",
    price: "INR 2L+",
    points: [
      "Access to the institute's testing facilities",
      "Stalls at all events we attend",
      "Branding on vehicle and jersey",
      "Branding on various avenues & social platforms",
    ],
  },
];

const SponsorPage = () => {
  return (
    <div className="min-h-screen grid-bg bg-background text-foreground relative overflow-hidden">
      {/* small check accent */}
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
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-foreground" />
          <span className="font-heading text-[10px] tracking-[0.4em] uppercase">
            Chapter 07 — Sponsor Stier Racing
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6">
          SPONSOR
          <br />
          STIER<span className="text-primary">.</span>
        </h1>

        <p className="font-body text-base md:text-lg max-w-3xl text-muted-foreground">
          Partner with Stier Racing and become a part of our Formula Student Electric journey.
          Explore our sponsorship tiers and choose the level that best aligns with your brand,
          technology and vision.
        </p>
      </section>

      {/* Sponsor cards */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className={`border-2 rounded-2xl overflow-hidden ${
                tier.highlight
                  ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                  : "border-foreground"
              }`}
            >
              {tier.highlight && (
                <div className="bg-primary text-primary-foreground text-center font-heading text-sm tracking-[0.2em] uppercase py-3">
                  Most Popular
                </div>
              )}

              <div className="bg-foreground text-background p-8 h-full flex flex-col">
                <h2 className="font-display text-4xl md:text-5xl leading-none mb-4">
                  {tier.name}
                </h2>

                <p className="font-display text-primary text-3xl md:text-4xl mb-8">
                  {tier.price}
                </p>

                <ul className="space-y-5 flex-1">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="text-primary font-display text-2xl leading-none mt-0.5">
                        ✓
                      </span>
                      <span className="font-body text-lg leading-relaxed text-background/80">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#continue-sponsor"
                    className="block w-full text-center px-6 py-4 bg-background/15 border border-background/20 font-display text-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors rounded-xl"
                  >
                    Become a Sponsor
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section
        id="continue-sponsor"
        className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20 pt-6"
      >
        <div className="max-w-3xl border-2 border-foreground rounded-2xl bg-background p-8 md:p-10 relative overflow-hidden">
          <div className="absolute right-6 bottom-6 w-16 h-16 checker opacity-10 hidden md:block" />

          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-foreground" />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">
              Final Step
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter mb-4">
            LET'S BUILD
            <br />
            TOGETHER<span className="text-primary">.</span>
          </h2>

          <p className="font-body text-base md:text-lg text-muted-foreground mb-8 max-w-2xl">
            If you would like to partner with us, continue below and we will take you
            directly to the sponsor inquiry mail page.
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=stierracing@gmail.com&su=Sponsor%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 md:px-14 h-14 md:h-16 bg-primary text-primary-foreground border-2 border-primary font-heading text-sm md:text-base tracking-[0.35em] uppercase transition-all hover:bg-black hover:text-white hover:border-black"
          >
            Continue to be our sponsor →
          </a>
        </div>
      </section>
    </div>
  );
};

export default SponsorPage;
