import { useEffect, useRef, useState } from "react";
import { Gear } from "@/components/Gear";

/* ---------- shared mechanical bits ---------- */

const ChainLink = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="inline-block">
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="hsl(0 0% 35%)" strokeWidth="3" fill="none" />
    <ellipse cx="28" cy="12" rx="10" ry="8" stroke="hsl(0 0% 40%)" strokeWidth="3" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.4" />
    <ellipse cx="28" cy="12" rx="10" ry="8" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.4" />
  </svg>
);

const ChainStrip = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="overflow-hidden w-full py-1">
    <div className={reverse ? "marquee-animation flex whitespace-nowrap [animation-direction:reverse]" : "marquee-animation flex whitespace-nowrap"}>
      {Array.from({ length: 60 }).map((_, i) => <ChainLink key={i} />)}
    </div>
  </div>
);

const TireWheel = ({ rotation, size = 120 }: { rotation: number; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: `rotate(${rotation}deg)` }}>
    <circle cx="60" cy="60" r="55" stroke="hsl(0 0% 25%)" strokeWidth="8" fill="hsl(0 0% 10%)" />
    <circle cx="60" cy="60" r="45" stroke="hsl(0 0% 20%)" strokeWidth="2" fill="none" />
    <circle cx="60" cy="60" r="15" fill="hsl(var(--primary))" opacity="0.8" />
    <circle cx="60" cy="60" r="10" fill="hsl(0 0% 15%)" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <line
        key={angle}
        x1="60" y1="60"
        x2={60 + 40 * Math.cos((angle * Math.PI) / 180)}
        y2={60 + 40 * Math.sin((angle * Math.PI) / 180)}
        stroke="hsl(0 0% 30%)" strokeWidth="3"
      />
    ))}
  </svg>
);

/* ---------- scroll-driven floating gear (always visible) ---------- */

const ScrollGear = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none hidden md:block">
      <div style={{ transform: `rotate(${scrollY * 0.5}deg)` }}>
        <Gear size={110} teeth={14} />
      </div>
      <div className="absolute -top-10 -left-10" style={{ transform: `rotate(${-scrollY * 0.7}deg)` }}>
        <Gear size={70} teeth={10} color="hsl(0 0% 50%)" />
      </div>
    </div>
  );
};

/* ---------- navbar ---------- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["about", "achievements", "car", "gallery", "sponsors", "contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-primary/30" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img src="/images/stier-logo.jpg" alt="Stier Racing" className="h-10 w-auto" />
          <span className="font-display text-xl tracking-widest text-primary hidden sm:block">STIER</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link}`} className="font-heading text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

/* ---------- hero (Formula Bharat inspired) ---------- */

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tireRotation, setTireRotation] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
      setTireRotation((prev) => prev + Math.abs(x) * 3 + Math.abs(y) * 3);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* dark image overlay backdrop */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://i.imgur.com/KkCs3pP.jpeg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 diagonal-stripes opacity-30" />

      {/* speed lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            style={{ top: `${10 + i * 12}%`, left: 0, right: 0, animation: `speed-lines ${3 + i * 0.5}s linear infinite`, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>

      {/* corner gears */}
      <div className="absolute top-24 left-6 opacity-30 hidden md:block">
        <div className="gear-spin-slow"><Gear size={140} teeth={16} /></div>
      </div>
      <div className="absolute bottom-24 right-6 opacity-30 hidden md:block">
        <div className="gear-spin-reverse-slow"><Gear size={180} teeth={18} /></div>
      </div>

      {/* tires */}
      <div className="absolute left-8 bottom-32 opacity-25 hidden lg:block">
        <TireWheel rotation={tireRotation} />
      </div>
      <div className="absolute right-8 bottom-32 opacity-25 hidden lg:block">
        <TireWheel rotation={-tireRotation} />
      </div>

      {/* main content with parallax */}
      <div className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`, transition: "transform 0.1s ease-out" }}>
        <p className="font-heading text-xs md:text-sm tracking-[0.4em] text-primary/80 mb-4 uppercase">
          Ramaiah Institute of Technology presents
        </p>
        <img src="/images/stier-logo.jpg" alt="Stier Racing Logo"
          className="w-32 h-32 md:w-44 md:h-44 object-contain mb-4 drop-shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
          style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
        />
        <h1 className="font-display text-7xl md:text-[10rem] leading-[0.9] tracking-tight text-foreground glitch-hover">
          STIER<span className="text-primary racing-glow-intense">.</span>
        </h1>

        {/* Design. Build. Compete. — Formula Bharat style */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 md:gap-10 font-display text-4xl md:text-6xl">
          <span className="reveal-up text-foreground" style={{ animationDelay: "0.1s" }}>Design<span className="text-primary">.</span></span>
          <span className="reveal-up text-foreground" style={{ animationDelay: "0.4s" }}>Build<span className="text-primary">.</span></span>
          <span className="reveal-up text-foreground" style={{ animationDelay: "0.7s" }}>Race<span className="text-primary">.</span></span>
        </div>

        <p className="mt-8 font-heading text-xs md:text-sm tracking-[0.3em] text-foreground/50 uppercase">
          EV Formula Student Team · Est. 2018
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <ChainStrip />
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </section>
  );
};

/* ---------- big marquee strip ---------- */

const MarqueeStrip = ({ text, reverse = false }: { text: string; reverse?: boolean }) => (
  <div className="relative py-6 bg-primary/10 border-y border-primary/30 overflow-hidden">
    <div className={`flex whitespace-nowrap ${reverse ? "marquee-animation [animation-direction:reverse]" : "marquee-animation"}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="font-display text-5xl md:text-7xl tracking-tight text-foreground mx-8 flex items-center gap-8">
          {text}
          <span className="text-primary">★</span>
        </span>
      ))}
    </div>
  </div>
);

/* ---------- about ---------- */

const AboutSection = () => (
  <section id="about" className="relative py-24 racing-gradient-bg overflow-hidden">
    <div className="racing-stripe absolute inset-0 pointer-events-none" />
    <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-20">
      <div className="gear-spin-slow"><Gear size={300} teeth={20} /></div>
    </div>
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center">
        <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 uppercase">// 01 — Who we are</p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-8 tracking-tight">
          ABOUT <span className="text-primary racing-glow">US</span>
        </h2>
        <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
          Based out of Ramaiah Institute of Technology, <span className="text-primary font-semibold">Stier Racing</span> is a Formula Student Electric Racing team.
          We are engaged in building the best and most efficient Formula Student cars, competing at the highest level of the Formula Championship.
        </p>
        <a href="#contact" className="mt-10 px-10 py-4 font-heading text-sm tracking-[0.3em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 racing-box-glow uppercase">
          Get in touch
        </a>
      </div>
    </div>
  </section>
);

/* ---------- achievements ---------- */

const achievements = [
  { year: "Formula Bharat 2025", items: ["Cleared Accumulator TI", "Cleared Mechanical TI"] },
  { year: "Formula Bharat 2024", items: ["AIR 2 - Business Plan", "AIR 2 - Engineering Design"] },
  { year: "Formula Imperial 2023", items: ["Overall AIR 3 in EV Category", "Winners of Best Acceleration Award", "Winners of ISIE Future Award", "AIR 3 in Business Plan", "AIR 2 in Rulebook Quiz"] },
  { year: "Champions - Formula Green 2022", items: ["1st in Engineering Design", "1st in Business Plan"] },
];

const AchievementsSection = () => (
  <section id="achievements" className="relative py-24 overflow-hidden">
    <div className="absolute top-0 left-0 right-0"><ChainStrip reverse /></div>
    <div className="absolute -right-20 top-20 opacity-15">
      <div className="gear-spin-fast"><Gear size={250} teeth={18} /></div>
    </div>
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 text-center uppercase">// 02 — Track Record</p>
      <h2 className="font-display text-5xl md:text-7xl text-center text-foreground mb-16 tracking-tight">
        ACHIEVE<span className="text-primary racing-glow">MENTS</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((a, idx) => (
          <div key={a.year} className="relative racing-border p-8 bg-card/60 backdrop-blur-sm hover:racing-border-glow transition-all duration-500 group">
            <span className="absolute top-4 right-4 font-display text-5xl text-primary/20 group-hover:text-primary/40 transition-colors">
              0{idx + 1}
            </span>
            <h3 className="font-heading text-lg text-primary mb-4 tracking-wider group-hover:racing-glow transition-all">
              {a.year}
            </h3>
            <ul className="space-y-2">
              {a.items.map((item) => (
                <li key={item} className="font-body text-foreground/70 flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rotate-45 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0"><ChainStrip /></div>
  </section>
);

/* ---------- car ---------- */

const CarSection = () => {
  const [scrollRotation, setScrollRotation] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollRotation(window.scrollY * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="car" className="relative py-24 racing-gradient-bg overflow-hidden">
      <div className="racing-stripe absolute inset-0 pointer-events-none" />
      <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 opacity-15">
        <TireWheel rotation={scrollRotation} size={180} />
      </div>
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 opacity-15">
        <TireWheel rotation={-scrollRotation} size={180} />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 uppercase">// 03 — Our Machine</p>
        <h2 className="font-display text-7xl md:text-9xl text-primary racing-glow-intense mb-2 italic tracking-tighter">E23</h2>
        <p className="font-heading text-xs tracking-[0.3em] text-foreground/50 mb-12 uppercase">Built. Tested. Proven.</p>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/10 blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
          <img src="https://i.imgur.com/KkCs3pP.jpeg" alt="Stier EV Car E23"
            className="relative w-full rounded-sm racing-border group-hover:racing-border-glow transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------- marquee divider ---------- */

/* ---------- gallery ---------- */

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

const GallerySection = () => (
  <section id="gallery" className="relative py-24">
    <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 text-center uppercase">// 04 — In Motion</p>
    <h2 className="font-display text-5xl md:text-7xl text-foreground mb-12 text-center tracking-tight">
      GAL<span className="text-primary racing-glow">LERY</span>
    </h2>
    <div className="overflow-hidden">
      <div className="gallery-scroll-animation flex gap-6 whitespace-nowrap">
        {[...galleryImages, ...galleryImages].map((img, i) => (
          <div key={i} className="flex-shrink-0 w-80 h-52 overflow-hidden racing-border hover:racing-border-glow transition-all duration-500">
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- sponsors ---------- */

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

const SponsorsSection = () => (
  <section id="sponsors" className="relative py-24 racing-gradient-bg overflow-hidden">
    <div className="racing-stripe absolute inset-0 pointer-events-none" />
    <div className="absolute top-0 left-0 right-0"><ChainStrip reverse /></div>
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 text-center uppercase">// 05 — Powered By</p>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mb-16 text-center tracking-tight">
        SPON<span className="text-primary racing-glow">SORS</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
        {sponsorLogos.map((logo, i) => (
          <div key={i} className="bg-secondary/50 p-4 w-full h-24 flex items-center justify-center racing-border hover:racing-border-glow transition-all duration-500">
            <img src={logo} alt={`Sponsor ${i + 1}`} className="max-h-14 max-w-full object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0"><ChainStrip /></div>
  </section>
);

/* ---------- contact ---------- */

const ContactSection = () => (
  <section id="contact" className="relative py-24 overflow-hidden">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
      <div className="gear-spin-slow"><Gear size={500} teeth={24} /></div>
    </div>
    <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
      <p className="font-heading text-xs tracking-[0.4em] text-primary/70 mb-3 uppercase">// 06 — Reach Out</p>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mb-12 tracking-tight">
        CON<span className="text-primary racing-glow">TACT</span>
      </h2>
      <div className="racing-border p-8 bg-card/60 backdrop-blur-md">
        <p className="font-heading text-sm tracking-wider text-foreground/50 mb-2">EMAIL</p>
        <a href="mailto:stierracing@gmail.com" className="font-body text-xl text-primary hover:racing-glow transition-all">
          stierracing@gmail.com
        </a>
        <div className="my-6 h-[1px] bg-border" />
        <p className="font-heading text-sm tracking-wider text-foreground/50 mb-2">ADDRESS</p>
        <p className="font-body text-lg text-foreground/70">
          ESB 119, Ramaiah Institute of Technology,<br />
          MSR Nagar, Bangalore - 560054
        </p>
      </div>
    </div>
  </section>
);

/* ---------- footer ---------- */

const Footer = () => (
  <footer className="py-8 border-t border-primary/20 relative">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src="/images/stier-logo.jpg" alt="Stier Racing" className="h-8 w-auto" />
        <span className="font-display text-xl tracking-wider text-foreground/50">STIER RACING</span>
      </div>
      <p className="font-body text-sm text-foreground/30">
        © {new Date().getFullYear()} Stier Racing — Ramaiah Institute of Technology
      </p>
    </div>
  </footer>
);

/* ---------- page ---------- */

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollGear />
      <HeroSection />
      <MarqueeStrip text="STIER RACING" />
      <AboutSection />
      <AchievementsSection />
      <MarqueeStrip text="DESIGN · BUILD · RACE" reverse />
      <CarSection />
      <GallerySection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
