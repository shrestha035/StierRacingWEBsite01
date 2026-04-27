import { useEffect, useRef, useState } from "react";
import { Reveal, useInView } from "@/hooks/useReveal";

/* =====================================================
   CIRCUIT PROGRESS RAIL — fills as you scroll
   ===================================================== */

const CircuitRail = ({ progress, sections }: { progress: number; sections: { id: string; label: string }[] }) => {
  const pathD = "M 30 40 L 30 180 Q 30 220 70 220 L 110 220 Q 150 220 150 260 L 150 400 Q 150 440 110 440 L 70 440 Q 30 440 30 480 L 30 640 Q 30 680 70 680 L 110 680 Q 150 680 150 720 L 150 860 Q 150 900 110 900 L 70 900 Q 30 900 30 940 L 30 1080";
  const totalLen = 1400;
  const dashOffset = totalLen - progress * totalLen;

  return (
    <div className="fixed left-4 top-0 h-screen z-40 pointer-events-none hidden lg:block">
      <svg width="180" height="100%" viewBox="0 0 180 1100" preserveAspectRatio="xMidYMid meet" className="h-full">
       <path d={pathD} fill="none" stroke="hsl(var(--border))" strokeWidth="10" strokeLinecap="round" />
       <path d={pathD} fill="none" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="2" strokeDasharray="6 10" />
       <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={totalLen} strokeDashoffset={dashOffset}
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))", transition: "stroke-dashoffset 0.2s linear" }}
        />
        <circle r="9" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="3">
          <animateMotion dur="0s" fill="freeze" path={pathD} keyPoints={`${progress};${progress}`} keyTimes="0;1" />
        </circle>
        {sections.map((s, i) => {
          const t = i / Math.max(sections.length - 1, 1);
          const active = progress >= t - 0.05;
          return (
            <circle key={s.id} r="6" fill={active ? "hsl(var(--primary))" : "hsl(var(--background))"} stroke="hsl(var(--foreground))" strokeWidth="2">
              <animateMotion dur="0s" fill="freeze" path={pathD} keyPoints={`${t};${t}`} keyTimes="0;1" />
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

/* =====================================================
   SCROLL PROGRESS BAR (top)
   ===================================================== */

const ScrollBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
    <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
  </div>
);

/* =====================================================
   NAV
   ===================================================== */

const sections = [
  { id: "hero", label: "START" },
  { id: "about", label: "TEAM" },
  { id: "achievements", label: "WINS" },
  { id: "car", label: "E14" },
  { id: "gallery", label: "GALLERY" },    
  { id: "sponsors", label: "SPONSORS" },
  { id: "contact", label: "FINISH" },
];

const TopNav = ({ activeIndex }: { activeIndex: number }) => (
  <nav className="fixed top-1 left-0 right-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur">
    <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="/images/logofinal_nobg.png"
          alt="Stier Racing Logo"
          className="h-10 md:h-12 w-auto object-contain"
        />
        <div className="flex flex-col leading-none gap-1">
          <img
            src="/images/stier_racing_no_bg.png"
            alt="Stier Racing"
            className="h-7 md:h-9 w-auto object-contain"
          />
          <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Ramaiah Institute · EV Formula
          </span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`}
            className={`font-heading text-[10px] tracking-[0.25em] uppercase px-3 py-2 transition-colors ${
              i === activeIndex ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}>
            {String(i + 1).padStart(2, "0")} · {s.label}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

/* =====================================================
   HERO
   ===================================================== */

const Hero = ({ id, scrollY }: { id: string; scrollY: number }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const i = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(i); }, []);
  const timeStr = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  // parallax: hero stays in view but its content drifts slightly
  const py = Math.min(scrollY, 600) * 0.3;

  return (
    <section id={id} className="snap-section grid-bg flex items-center justify-center overflow-hidden">
     
      <div className="absolute bottom-6 left-32 w-12 h-32 checker opacity-80" style={{ transform: `translateY(${-py * 0.4}px)` }} />

      <div className="absolute top-24 left-10 hidden md:block font-heading text-[10px] tracking-[0.25em] text-foreground/60 space-y-1">
        <div>SYS · ONLINE <span className="blink text-primary">●</span></div>
        <div>{timeStr} IST</div>
        <div>BLR · 12.99°N 77.57°E</div>
        <div>SEASON · {new Date().getFullYear()}</div>
      </div>
      <div className="absolute top-24 right-10 hidden md:block font-heading text-[10px] tracking-[0.25em] text-foreground/60 text-right space-y-1">
        <div>EV CLASS</div>
        <div>FORMULA STUDENT</div>
        <div>TEAM ID · 014</div>
      </div>

      <div className="relative z-10 px-6 text-center max-w-6xl" style={{ transform: `translateY(${-py}px)`, opacity: 1 - scrollY / 800 }}>
        <Reveal from="down">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-foreground" />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">Engineered to win</span>
            <div className="h-px w-12 bg-foreground" />
          </div>
        </Reveal>

      <Reveal from="scale" delay={100}>
<div className="flex justify-center -translate-x-3">
  <img
    src="/images/stierracing_red.png"
    alt="Stier Racing"
    className="w-[70vw] md:w-[50vw] max-w-[900px] h-auto object-contain"
  />
</div>
</Reveal>

        <div className="mt-4 flex items-center justify-center gap-4 flex-wrap font-display text-2xl md:text-4xl">
          <Reveal from="left" delay={300}><span className="px-4 py-1 bg-foreground text-background">EV</span></Reveal>
          <Reveal from="up" delay={400}><span>FORMULA STUDENT</span></Reveal>
          <Reveal from="right" delay={500}><span className="px-4 py-1 border-2 border-foreground">EST · 2018</span></Reveal>
        </div>

        <Reveal from="up" delay={700}>
          <p className="mt-10 font-body text-base md:text-lg max-w-xl mx-auto text-muted-foreground">
            Designed, built and raced by students of Ramaiah Institute of Technology, Bangalore.
          </p>
        </Reveal>

        <Reveal from="up" delay={900}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="#about" className="px-8 py-4 bg-primary text-primary-foreground font-heading text-xs tracking-[0.3em] uppercase hover:bg-foreground transition-colors">
              Start Lap →
            </a>
            <a href="#car" className="px-8 py-4 border-2 border-foreground font-heading text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-colors">
              See E14
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 overflow-hidden border-t-2 border-foreground">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="font-display text-2xl mx-6 flex items-center gap-6">
              SCROLL TO START <span className="text-primary">●</span> STIER RACING <span className="text-primary">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =====================================================
   ANIMATED SECTION NUMBER (slides in)
   ===================================================== */

const SectionShell = ({
  id, number, title, kicker, children, dark = false,
}: { id: string; number: string; title: React.ReactNode; kicker: string; children: React.ReactNode; dark?: boolean }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section
      id={id}
      ref={ref}
      className={`snap-section flex items-center justify-center overflow-hidden ${dark ? "bg-foreground text-background" : "grid-bg"}`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 right-0 section-number pr-8 transition-all duration-1000 ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-32"
        }`}
        style={dark ? { color: "hsl(var(--background) / 0.08)" } : undefined}
      >
        {number}
      </div>
      <div className="relative z-10 max-w-6xl w-full px-8 md:px-16 pt-24 pb-16">
        <Reveal from="left">
          <div className="flex items-center gap-3 mb-4">
            <span className={`h-px w-10 ${dark ? "bg-background" : "bg-foreground"}`} />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">{kicker}</span>
          </div>
        </Reveal>
        <Reveal from="up" delay={150}>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-10">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
};

/* =====================================================
   ABOUT
   ===================================================== */

const About = ({ id }: { id: string }) => (
  <SectionShell id={id} number="01" kicker="Chapter 01 — The Team" title={<>WE BUILD<br />RACE CARS<span className="text-primary">.</span></>}>
    <div className="grid md:grid-cols-2 gap-10">
      <Reveal from="left" delay={300}>
        <p className="font-body text-lg leading-relaxed text-foreground/80">
          Stier Racing is the Formula Student Electric team of <strong>Ramaiah Institute of Technology, Bangalore</strong>.
          We are a group of student engineers, designers and managers obsessed with one thing —
          <span className="text-primary font-semibold"> building the fastest, smartest EV race car on the grid.</span>
        </p>
        <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
          Each year we design, manufacture and race a new prototype against the best engineering colleges in India.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 gap-4">
        {[
          { k: "EST", v: "2018" },
          { k: "MEMBERS", v: "60+" },
          { k: "CARS BUILT", v: "5" },
          { k: "PODIUMS", v: "8+" },
        ].map((s, i) => (
          <Reveal key={s.k} from="scale" delay={400 + i * 120}>
            <div className="border-2 border-foreground p-5 hover:bg-foreground hover:text-background transition-colors cursor-default">
              <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground">{s.k}</p>
              <p className="font-display text-5xl md:text-6xl leading-none mt-1">{s.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SectionShell>
);

/* =====================================================
   ACHIEVEMENTS
   ===================================================== */

const achievements = [
  { year: "2026", event: "Formula Bharat", items: ["Cleared Electrical TI","Cleared Accumulator TI", "Cleared Mechanical TI", "AIR3-Acceleration"] },
  { year: "2025", event: "Formula Bharat", items: ["Cleared Accumulator TI", "Cleared Mechanical TI"] },
  { year: "2024", event: "Formula Bharat", items: ["AIR 2 — Business Plan", "AIR 2 — Engineering Design"] },
  { year: "2023", event: "Formula Imperial", items: ["Overall AIR 3 — EV Category", "Best Acceleration Award", "ISIE Future Award", "AIR 3 — Business Plan", "AIR 2 — Rulebook Quiz"] },
  { year: "2022", event: "Formula Green — CHAMPIONS", items: ["1st — Engineering Design", "1st — Business Plan"] },
];

const Achievements = ({ id }: { id: string }) => (
  <SectionShell id={id} number="02" kicker="Chapter 02 — Track Record" title={<>WINS &<br />AWARDS<span className="text-primary">.</span></>} dark>
    <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
      {achievements.map((a, i) => (
        <Reveal key={i} from="right" delay={200 + i * 150}>
          <div className="grid grid-cols-12 gap-4 border-b border-background/20 pb-3 group hover:bg-background/5 px-2 transition-colors">
            <div className="col-span-2 font-display text-4xl md:text-5xl text-primary">{a.year}</div>
            <div className="col-span-4 font-heading text-xs tracking-[0.2em] uppercase pt-3">{a.event}</div>
            <div className="col-span-6 font-body text-sm md:text-base pt-3">
              {a.items.map((it, j) => (
                <span key={j} className="inline-block mr-3">
                  {it}{j < a.items.length - 1 && <span className="text-primary mx-2">/</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </SectionShell>
);

/* =====================================================
   CAR
   ===================================================== */

const Car = ({ id }: { id: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section id={id} ref={ref} className="snap-section grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="relative bg-foreground flex items-center justify-center overflow-hidden p-12">
        <div className="absolute top-6 left-6 font-heading text-[10px] tracking-[0.3em] text-background/60">PROTOTYPE · 014</div>
        <div className="absolute bottom-6 right-6 w-20 h-20 spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--background))" strokeWidth="2" />
          </svg>
        </div>
    <img
  src="/images/e14car.png"
  alt="E14"
  className={`w-full max-w-lg object-contain transition-all duration-1000 ease-out ${
    inView ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-40 scale-90"
  }`}
/>
      </div>
      <div className="relative bg-background flex flex-col justify-center px-10 md:px-16 py-24">
        <Reveal from="right">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-foreground" />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">Chapter 03 — The Machine</span>
          </div>
        </Reveal>
        <Reveal from="right" delay={150}><p className="font-display text-2xl text-muted-foreground">Meet</p></Reveal>
        <Reveal from="right" delay={250}>
          <h2 className="font-display text-[18vw] md:text-[10vw] leading-[0.85] tracking-tighter italic">
            E14<span className="text-primary">.</span>
          </h2>
        </Reveal>
        <Reveal from="up" delay={400}>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-md">
            Our latest electric formula prototype — designed, fabricated and tested entirely by students.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-px bg-foreground mt-8 border-2 border-foreground">
          {[
            { k: "POWERTRAIN", v: "Electric" },
            { k: "TOP SPEED", v: "70km/h" },
            { k: "0–100", v: "< 4s" },
            { k: "WEIGHT", v: "280 kg" },
          ].map((s, i) => (
            <Reveal key={s.k} from="scale" delay={500 + i * 100}>
              <div className="bg-background p-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                <p className="font-heading text-[9px] tracking-[0.3em] text-muted-foreground">{s.k}</p>
                <p className="font-display text-3xl mt-1">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =====================================================
   GALLERY
   ===================================================== */

const galleryImages = [
  "https://i.imgur.com/KkCs3pP.jpeg",
  "https://i.imgur.com/ZgYJ7vx.jpeg",
  "https://i.imgur.com/BATdRdY.jpeg",
  "https://i.imgur.com/tw2KhR2.jpeg",
  "https://i.imgur.com/z2VZjGC.jpeg",
  "https://i.imgur.com/tK3A6Up.jpeg",
  "https://i.imgur.com/WBc4ys2.jpeg",
  "https://i.imgur.com/n7x4uns.jpeg",
];

const Gallery = ({ id }: { id: string }) => (
  <section id={id} className="snap-section flex flex-col justify-center bg-background overflow-hidden">
    <div className="px-8 md:px-16 pt-24">
      <Reveal from="left">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-10 bg-foreground" />
          <span className="font-heading text-[10px] tracking-[0.4em] uppercase">Chapter 04 — In Frame</span>
        </div>
      </Reveal>
      <Reveal from="up" delay={150}>
        <h2 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tighter">GALLERY<span className="text-primary">.</span></h2>
      </Reveal>
    </div>
    <Reveal from="up" delay={300}>
      <div className="mt-12 overflow-hidden">
        <div className="flex gap-4 marquee">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[420px] h-[280px] overflow-hidden border-2 border-foreground bg-foreground group relative">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-2 left-2 font-heading text-[9px] tracking-[0.3em] text-background bg-foreground px-2 py-1">
                0{(i % 8) + 1} / 08
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
    <Reveal from="up" delay={500}>
      <div className="mt-6 overflow-hidden">
        <div className="flex gap-4 marquee-reverse">
          {[...galleryImages, ...galleryImages].reverse().map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] h-[200px] overflow-hidden border-2 border-foreground bg-foreground">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);

/* =====================================================
   SPONSORS
   ===================================================== */

const sponsorLogos = [
  "https://nimbleelectric.com/wp-content/uploads/2021/07/Nimble-Electric-Medium-1.png",
  "https://am-ace.com/wp-content/uploads/2024/11/amace-logo.svg",
  "https://www.acemultiaxes.com/img/images/logo.png",
  "https://www.hastinenergy.com/images/hastin-energy.png",
  "https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_solidworks.svg",
  "https://optimumg.com/wp-content/uploads/2024/04/OptimumG_VDS_logo_color500.png",
  "https://etherealmachines.com/wp-content/uploads/2022/02/Logo-Vertical.svg",
  "https://www.wilwood.com/images/wilwood_media_br_36.png",
];

const Sponsors = ({ id }: { id: string }) => (
  <SectionShell
    id={id}
    number="05"
    kicker="Chapter 05 — Powered By"
    title={<>OUR<br />PARTNERS<span className="text-primary">.</span></>}
  >
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=stierracing@gmail.com&su=Sponsor%20Inquiry"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-10 md:px-14 h-14 md:h-16 bg-primary text-primary-foreground border-2 border-primary font-heading text-sm md:text-base tracking-[0.35em] uppercase transition-all mb-4 hover:bg-black hover:text-white hover:border-black"
    >
      Be a Sponsor →
    </a>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground border-2 border-foreground">
      {sponsorLogos.map((logo, i) => (
        <Reveal key={i} from="scale" delay={150 + i * 80}>
          <div className="bg-background h-32 flex items-center justify-center p-6 hover:bg-primary group transition-colors">
            <img
              src={logo}
              alt=""
              className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert transition-all"
            />
          </div>
        </Reveal>
      ))}
    </div>
  </SectionShell>
);
/* =====================================================
   CONTACT
   ===================================================== */

const Contact = ({ id }: { id: string }) => (
  <section id={id} className="snap-section bg-foreground text-background flex flex-col justify-between overflow-hidden">
    <div className="flex-1 flex items-center px-8 md:px-16 pt-24">
      <div className="max-w-5xl w-full">
        <Reveal from="left">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-background" />
            <span className="font-heading text-[10px] tracking-[0.4em] uppercase">Chapter 06 — Finish Line</span>
          </div>
        </Reveal>
        <Reveal from="up" delay={150}>
          <h2 className="font-display text-6xl md:text-9xl leading-[0.85] tracking-tighter mb-10">
            LET'S<br />TALK<span className="text-primary">.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          <Reveal from="up" delay={300}>
      <div>
  <p className="font-heading text-[10px] tracking-[0.3em] text-background/50 mb-2">EMAIL</p>

  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=stierracing@gmail.com&su=Stier%20Racing%20Inquiry"
    target="_blank"
    rel="noopener noreferrer"
    className="font-display text-2xl md:text-3xl hover:text-primary transition-colors break-all"
  >
    stierracing@gmail.com
  </a>
</div>
          </Reveal>
          <Reveal from="up" delay={450}>
            <div>
              <p className="font-heading text-[10px] tracking-[0.3em] text-background/50 mb-2">ADDRESS</p>
              <p className="font-body text-lg">ESB 119, Ramaiah Institute of Technology, MSR Nagar, Bangalore — 560054</p>
            </div>
          </Reveal>
          <Reveal from="up" delay={600}>
            <div>
              <p className="font-heading text-[10px] tracking-[0.3em] text-background/50 mb-2">FOLLOW</p>
            <div className="space-y-1 font-display text-2xl">
  <a
    href="https://www.instagram.com/stierracingmsrit/"
    target="_blank"
    rel="noopener noreferrer"
    className="block hover:text-primary transition-colors"
  >
    → INSTAGRAM
  </a>
  <a
    href="https://www.linkedin.com/company/stier-racing/posts/?feedView=all"
    target="_blank"
    rel="noopener noreferrer"
    className="block hover:text-primary transition-colors"
  >
    → LINKEDIN
  </a>
</div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
    <div className="h-12 checker" style={{ filter: "invert(1)" }} />
    <div className="bg-background text-foreground py-4 px-8 flex items-center justify-between border-t-2 border-foreground">
      <span className="font-display text-xl tracking-wide">STIER RACING</span>
      <span className="font-body text-xs text-muted-foreground">© {new Date().getFullYear()} · Ramaiah Institute of Technology</span>
    </div>
  </section>
);

/* =====================================================
   FLOATING SCROLL CAR — drives across screen as you scroll
   ===================================================== */

const FloatingCar = ({ progress }: { progress: number }) => (
  <div
    className="fixed bottom-4 z-40 pointer-events-none transition-[left] duration-200 ease-out hidden md:block"
    style={{ left: `${Math.max(0, Math.min(82, 2 + progress * 86))}%` }}
  >
    <img
      src="/images/stier-car.png"
      alt="Stier Racing car"
      className="w-[220px] h-auto object-contain drop-shadow-lg"
      draggable={false}
    />
  </div>
);
/* =====================================================
   PAGE
   ===================================================== */

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
      setScrollY(el.scrollTop);
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActiveIndex(Math.min(Math.max(idx, 0), sections.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollBar progress={progress} />
      <TopNav activeIndex={activeIndex} />
      <CircuitRail progress={progress} sections={sections} />
      <FloatingCar progress={progress} />
      <div ref={containerRef} className="snap-container">
        <Hero id="hero" scrollY={scrollY} />
        <About id="about" />
        <Achievements id="achievements" />
        <Car id="car" />
        <Gallery id="gallery" />
        <Sponsors id="sponsors" />
        <Contact id="contact" />
      </div>
    </>
  );
};

export default Index;
