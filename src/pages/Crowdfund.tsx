import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Reveal } from "@/hooks/useReveal";

const ChapterKicker = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-5 mb-6">
    <span className="h-[2px] w-16 bg-[#D4AF37]" />
    <span className="font-heading text-[9px] md:text-[11px] font-black tracking-[0.42em] uppercase text-[#D4AF37] whitespace-nowrap">
      {children}
    </span>
  </div>
);

const carParts = [
  {
    name: "Racing Tyres",
    amount: "₹25,000",
    desc: "Help us improve grip, acceleration, braking and overall track performance.",
  },
  {
    name: "Battery Safety",
    amount: "₹15,000",
    desc: "Support safety components for our accumulator, electrical protection and inspection readiness.",
  },
  {
    name: "Brake System",
    amount: "₹12,000",
    desc: "Help us build a reliable braking system for safer testing and racing.",
  },
  {
    name: "Suspension Parts",
    amount: "₹18,000",
    desc: "Support better handling, cornering stability and vehicle control.",
  },
  {
    name: "Sensors & Wiring",
    amount: "₹8,000",
    desc: "Help us monitor data, tune the vehicle and improve electrical reliability.",
  },
  {
    name: "Tools & Testing",
    amount: "₹5,000",
    desc: "Support workshop tools, test equipment and track preparation.",
  },
];

const Crowdfund = () => {
  const [showQR, setShowQR] = useState(false);
  const [contributed, setContributed] = useState(false);
  const navigate = useNavigate();

  const handleShowQR = () => {
    setShowQR(true);

    setTimeout(() => {
      setContributed(true);

     setTimeout(() => {
  navigate("/");
  setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, 300);
}, 3500);
    }, 8000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* TOP NAV */}
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

      {/* HERO */}
      <section className="min-h-screen grid-bg flex items-center justify-center px-8 md:px-16 pt-32 pb-16">
        <div className="max-w-7xl w-full">
          <Reveal from="left">
            <ChapterKicker>Chapter 07 — Crowd Fund</ChapterKicker>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <a
                  href="#parts"
                  className="inline-flex mt-8 px-10 md:px-14 h-14 md:h-16 bg-primary text-primary-foreground border-2 border-primary font-heading text-sm md:text-base tracking-[0.35em] uppercase transition-all hover:bg-black hover:text-white hover:border-black items-center"
                >
                  View Build Needs ↓
                </a>
              </Reveal>
            </div>

            <Reveal from="right" delay={250}>
              <div className="border-[4px] border-[#D4AF37] p-[5px]">
                <div className="border-2 border-foreground bg-background p-8 md:p-10">
                  <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
                    Why support us?
                  </p>

                  <h2 className="font-display text-4xl md:text-6xl leading-[0.9]">
                    STUDENT
                    <br />
                    BUILT<span className="text-primary">.</span>
                  </h2>

                  <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
                    Every part of our car is designed, built, tested and improved by students.
                    Your support directly helps us learn, manufacture, race and represent
                    Ramaiah Institute of Technology.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTS SECTION */}
      <section id="parts" className="min-h-screen bg-foreground text-background px-8 md:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal from="left">
            <ChapterKicker>Parts You Can Power</ChapterKicker>
          </Reveal>

          <Reveal from="up" delay={150}>
            <h2 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6">
              CHOOSE A
              <br />
              PART TO FUND<span className="text-primary">.</span>
            </h2>
          </Reveal>

          <Reveal from="up" delay={250}>
            <p className="font-body text-lg md:text-xl text-background/70 leading-relaxed max-w-3xl mb-12">
  Pick a part, support the build, and help us get closer to the grid. Your contribution
  helps student engineers turn late nights, calculations, prototypes, and workshop effort
  into a real electric Formula car ready to compete.
</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carParts.map((part, i) => (
              <Reveal key={part.name} from="scale" delay={200 + i * 80}>
                <div className="border-[3px] border-[#D4AF37] p-[4px] bg-background text-foreground h-full">
                  <div className="border-2 border-foreground h-full bg-background group hover:bg-foreground hover:text-background transition-colors">
                    {/* EMPTY IMAGE BOX */}
                    <div className="h-52 border-b-2 border-foreground bg-background flex items-center justify-center">
                      <div className="w-[85%] h-[70%] border-2 border-dashed border-[#D4AF37] flex items-center justify-center">
                        <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]">
                          Image Coming Soon
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#D4AF37]">
                        {part.amount}
                      </p>

                      <h3 className="font-display text-3xl md:text-4xl mt-2">
                        {part.name}
                      </h3>

                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
                        {part.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRIBUTE SECTION */}
      <section id="contribute" className="min-h-screen grid-bg flex items-center justify-center px-8 md:px-16 py-24">
        <div className="max-w-6xl w-full text-center">
          {!showQR && !contributed && (
            <>
              <Reveal from="up">
                <ChapterKicker center>Final Step</ChapterKicker>
              </Reveal>

              <Reveal from="scale" delay={150}>
                <h2 className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter mb-8">
                  READY TO
                  <br />
                  CONTRIBUTE<span className="text-primary">?</span>
                </h2>
              </Reveal>

              <Reveal from="up" delay={250}>
                <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Be a part of our electric racing journey. Your contribution helps student
                  engineers push limits and bring the car closer to the grid.
                </p>
              </Reveal>

              <Reveal from="up" delay={350}>
                <button
                  onClick={handleShowQR}
                  className="mt-10 px-10 md:px-14 h-14 md:h-16 bg-primary text-primary-foreground border-2 border-primary font-heading text-sm md:text-base tracking-[0.35em] uppercase transition-all hover:bg-black hover:text-white hover:border-black"
                >
                  Contribute Now →
                </button>
              </Reveal>
            </>
          )}

          {showQR && !contributed && (
            <Reveal from="scale">
              <div className="max-w-xl mx-auto border-[4px] border-[#D4AF37] p-[5px] bg-background">
                <div className="border-2 border-foreground p-8 md:p-10 flex flex-col items-center justify-center text-center">
                  <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
                    Scan to support the build
                  </p>

                  <div className="bg-white p-4 border-2 border-foreground">
                    <img
                      src={`${import.meta.env.BASE_URL}images/aniQR.png`}
                      alt="Scan QR to support Stier Racing"
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                  </div>

                  <p className="font-heading text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-6">
                    UPI: aniket.rbelgaonkar@okhdfcbank
                  </p>

                 <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-4 max-w-md">
  Scan the QR code using any UPI app and become a part of our journey. Your support
  helps power the next chapter of Stier Racing.
</p>

                  <button
                    onClick={() => setShowQR(false)}
                    className="mt-6 font-heading text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {contributed && (
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur flex items-center justify-center px-6">
              <Reveal from="scale">
                <div className="max-w-3xl mx-auto border-[4px] border-[#D4AF37] p-[5px] bg-background">
                  <div className="border-2 border-foreground p-8 md:p-12 text-center">
                    <p className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
                      Congratulations
                    </p>

                    <h2 className="font-display text-5xl md:text-8xl leading-[0.85] tracking-tighter">
                      YOU ARE
                      <br />
                      ONE OF OUR
                      <br />
                      CONTRIBUTORS<span className="text-primary">.</span>
                    </h2>

                    <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mt-8 max-w-2xl mx-auto">
                      Thank you for powering student innovation and supporting Stier Racing’s
                      electric motorsport journey.
                    </p>

                    <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-8">
                      Redirecting to finish page...
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Crowdfund;
