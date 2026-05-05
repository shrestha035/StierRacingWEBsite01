import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useReveal";

const ChapterKicker = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-5 mb-6">
    <span className="h-[2px] w-16 bg-[#D4AF37]" />
    <span className="font-heading text-[9px] md:text-[11px] font-black tracking-[0.42em] uppercase text-[#D4AF37] whitespace-nowrap">
      {children}
    </span>
  </div>
);

const Crowdfund = () => {
  return (
    <main className="min-h-screen grid-bg bg-background text-foreground overflow-hidden">
      <nav className="fixed top-1 left-0 right-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
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
          </Link>

          <Link
            to="/"
            className="font-heading text-[10px] tracking-[0.25em] uppercase px-4 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            ← Back Home
          </Link>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-8 md:px-16 pt-32 pb-16">
        <div className="max-w-7xl w-full">
          <Reveal from="left">
            <ChapterKicker>Chapter 06 — Crowd Fund</ChapterKicker>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal from="up" delay={150}>
                <h1 className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter mb-8">
                  SUPPORT
                  <br />
                  THE BUILD<span className="text-primary">.</span>
                </h1>
              </Reveal>

              <Reveal from="up" delay={250}>
                <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Fuel our journey from the workshop to the race track. Every contribution helps
                  Stier Racing turn student engineering into a real electric Formula car built to
                  compete on the national stage.
                </p>
              </Reveal>

              <Reveal from="up" delay={350}>
                <div className="mt-10 grid grid-cols-2 gap-4 max-w-xl">
                  {[
                    { k: "BUILD", v: "Parts" },
                    { k: "TEST", v: "Track" },
                    { k: "LEARN", v: "Skills" },
                    { k: "RACE", v: "India" },
                  ].map((item) => (
                    <div key={item.k} className="border-[3px] border-[#D4AF37] p-[4px]">
                      <div className="border-2 border-foreground bg-background p-5">
                        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">
                          {item.k}
                        </p>
                        <p className="font-display text-3xl md:text-4xl leading-none mt-2">
                          {item.v}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal from="up" delay={450}>
                <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-8 max-w-2xl">
                  Your support helps student engineers push limits, build faster, and represent
                  Ramaiah Institute of Technology on the Formula Student stage.
                </p>
              </Reveal>
            </div>

            <Reveal from="right" delay={300}>
              <div className="border-[4px] border-[#D4AF37] p-[5px] bg-background">
                <div className="border-2 border-foreground p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[480px]">
                  <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
                    Scan to support the build
                  </p>

                  <a
                    href="upi://pay?pa=YOUR-UPI-ID@bank&pn=Stier%20Racing&cu=INR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 border-2 border-foreground hover:scale-105 transition-transform"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}images/donation-qr.png`}
                      alt="Stier Racing Crowdfunding QR"
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                  </a>

                  <h2 className="font-display text-4xl mt-8">
                    BE PART OF
                    <br />
                    THE GRID<span className="text-primary">.</span>
                  </h2>

                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-4 max-w-md">
                    Scan the QR code or tap it to contribute. Every contribution moves us one step
                    closer to building a better, faster and safer electric race car.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Crowdfund;
