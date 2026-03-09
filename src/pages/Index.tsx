import { useEffect, useRef, useState } from "react";

const ChainLink = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="inline-block">
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="hsl(0 0% 35%)" strokeWidth="3" fill="none" />
    <ellipse cx="28" cy="12" rx="10" ry="8" stroke="hsl(0 0% 40%)" strokeWidth="3" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="hsl(0 85% 50%)" strokeWidth="1" fill="none" opacity="0.3" />
    <ellipse cx="28" cy="12" rx="10" ry="8" stroke="hsl(0 85% 50%)" strokeWidth="1" fill="none" opacity="0.3" />
  </svg>
);

const ChainStrip = ({ reverse = false }: { reverse?: boolean }) => {
  const links = Array.from({ length: 60 });
  return (
    <div className="overflow-hidden w-full py-1">
      <div className={reverse ? "chain-animation-reverse flex whitespace-nowrap" : "chain-animation flex whitespace-nowrap"}>
        {links.map((_, i) => (
          <ChainLink key={i} />
        ))}
      </div>
    </div>
  );
};

const TireWheel = ({ rotation }: { rotation: number }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="transition-none"
  >
    <circle cx="60" cy="60" r="55" stroke="hsl(0 0% 25%)" strokeWidth="8" fill="hsl(0 0% 10%)" />
    <circle cx="60" cy="60" r="45" stroke="hsl(0 0% 20%)" strokeWidth="2" fill="none" />
    <circle cx="60" cy="60" r="15" fill="hsl(0 85% 50%)" opacity="0.8" />
    <circle cx="60" cy="60" r="10" fill="hsl(0 0% 15%)" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <line
        key={angle}
        x1="60"
        y1="60"
        x2={60 + 40 * Math.cos((angle * Math.PI) / 180)}
        y2={60 + 40 * Math.sin((angle * Math.PI) / 180)}
        stroke="hsl(0 0% 30%)"
        strokeWidth="3"
      />
    ))}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <rect
        key={angle}
        x={60 + 48 * Math.cos((angle * Math.PI) / 180) - 3}
        y={60 + 48 * Math.sin((angle * Math.PI) / 180) - 6}
        width="6"
        height="12"
        fill="hsl(0 0% 20%)"
        transform={`rotate(${angle}, ${60 + 48 * Math.cos((angle * Math.PI) / 180)}, ${60 + 48 * Math.sin((angle * Math.PI) / 180)})`}
      />
    ))}
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["about", "achievements", "car", "gallery", "sponsors", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero">
          <img src="/images/stier-logo.jpg" alt="Stier Racing" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="font-heading text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

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
      {/* Speed lines background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              left: 0,
              right: 0,
              animation: `speed-lines ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated chevrons left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="text-primary text-3xl font-bold"
            style={{ animation: `chevron-pulse 1.5s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
          >
            ❯❯
          </div>
        ))}
      </div>

      {/* Animated chevrons right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="text-primary text-3xl font-bold"
            style={{ animation: `chevron-pulse 1.5s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
          >
            ❮❮
          </div>
        ))}
      </div>

      {/* Tire wheels on sides */}
      <div className="absolute left-8 bottom-20 opacity-20 hidden lg:block">
        <TireWheel rotation={tireRotation} />
      </div>
      <div className="absolute right-8 bottom-20 opacity-20 hidden lg:block">
        <TireWheel rotation={-tireRotation} />
      </div>

      {/* Main content with parallax */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src="/images/stier-logo.jpg"
          alt="Stier Racing Logo"
          className="w-40 h-40 md:w-56 md:h-56 object-contain mb-6 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          }}
        />
        <h1 className="font-display text-7xl md:text-9xl tracking-[0.15em] text-primary racing-glow-intense mb-4">
          STIER RACING
        </h1>
        <p className="font-body text-xl md:text-2xl text-foreground/70 tracking-widest">
          Ramaiah Institute of Technology's
        </p>
        <p className="font-heading text-lg md:text-xl text-primary/80 tracking-[0.3em] mt-1">
          EV FORMULA TEAM
        </p>
      </div>

      {/* Chain border bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <ChainStrip />
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="relative py-24 racing-gradient-bg">
    <div className="racing-stripe absolute inset-0 pointer-events-none" />
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center">
        <img src="/images/stier-logo.jpg" alt="Stier Racing" className="w-20 h-20 object-contain mb-6 opacity-60" />
        <h2 className="font-heading text-3xl md:text-4xl text-primary racing-glow mb-8 tracking-wider">ABOUT US</h2>
        <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
          Based out of Ramaiah Institute of Technology, Stier Racing is a Formula Student Electric Racing team.
          We are engaged in building the best and most efficient Formula Student cars.
          We compete in the Formula Championship.
        </p>
        <a
          href="#contact"
          className="mt-8 px-8 py-3 font-heading text-sm tracking-[0.2em] border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 racing-box-glow"
        >
          CONTACT US
        </a>
      </div>
    </div>
  </section>
);

const achievements = [
  {
    year: "Formula Bharat 2025",
    items: ["Cleared Accumulator TI", "Cleared Mechanical TI"],
  },
  {
    year: "Formula Bharat 2024",
    items: ["AIR 2 - Business Plan", "AIR 2 - Engineering Design"],
  },
  {
    year: "Formula Imperial 2023",
    items: [
      "Overall AIR 3 in EV Category",
      "Winners of Best Acceleration Award",
      "Winners of ISIE Future Award",
      "AIR 3 in Business Plan",
      "AIR 2 in Rulebook Quiz",
    ],
  },
  {
    year: "Champions - Formula Green 2022",
    items: ["1st in Engineering Design", "1st in Business Plan"],
  },
];

const AchievementsSection = () => (
  <section id="achievements" className="relative py-24">
    <div className="absolute top-0 left-0 right-0">
      <ChainStrip reverse />
    </div>
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="font-heading text-3xl md:text-4xl text-primary racing-glow mb-16 text-center tracking-wider">
        ACHIEVEMENTS
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {achievements.map((a) => (
          <div key={a.year} className="racing-border p-6 bg-card/50 backdrop-blur-sm hover:racing-border-glow transition-all duration-500 group">
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
    <div className="absolute bottom-0 left-0 right-0">
      <ChainStrip />
    </div>
  </section>
);

const CarSection = () => {
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollRotation(window.scrollY * 0.5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="car" className="relative py-24 racing-gradient-bg overflow-hidden">
      <div className="racing-stripe absolute inset-0 pointer-events-none" />

      {/* Rotating tires on scroll */}
      <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 opacity-10">
        <TireWheel rotation={scrollRotation} />
      </div>
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 opacity-10">
        <TireWheel rotation={-scrollRotation} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <h2 className="font-display text-6xl md:text-8xl text-center text-primary racing-glow-intense mb-12 italic">
          E23
        </h2>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <img
            src="https://i.imgur.com/KkCs3pP.jpeg"
            alt="Stier EV Car E23"
            className="relative w-full rounded-sm racing-border group-hover:racing-border-glow transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

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
    <h2 className="font-heading text-3xl md:text-4xl text-primary racing-glow mb-12 text-center tracking-wider">
      GALLERY
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
  <section id="sponsors" className="relative py-24 racing-gradient-bg">
    <div className="racing-stripe absolute inset-0 pointer-events-none" />
    <div className="absolute top-0 left-0 right-0">
      <ChainStrip reverse />
    </div>
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <h2 className="font-heading text-3xl md:text-4xl text-primary racing-glow mb-16 text-center tracking-wider">
        OUR SPONSORS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {sponsorLogos.map((logo, i) => (
          <div
            key={i}
            className="bg-secondary/50 p-4 w-full h-24 flex items-center justify-center racing-border hover:racing-border-glow transition-all duration-500"
          >
            <img src={logo} alt={`Sponsor ${i + 1}`} className="max-h-14 max-w-full object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <ChainStrip />
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="relative py-24">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <h2 className="font-heading text-3xl md:text-4xl text-primary racing-glow mb-12 tracking-wider">
        CONTACT US
      </h2>
      <div className="racing-border p-8 bg-card/30 backdrop-blur-sm">
        <p className="font-heading text-sm tracking-wider text-foreground/50 mb-2">EMAIL</p>
        <a href="mailto:stierracing@gmail.com" className="font-body text-xl text-primary hover:racing-glow transition-all">
          stierracing@gmail.com
        </a>
        <div className="my-6 h-[1px] bg-border" />
        <p className="font-heading text-sm tracking-wider text-foreground/50 mb-2">ADDRESS</p>
        <p className="font-body text-lg text-foreground/70">
          ESB 119, Ramaiah Institute of Technology,
          <br />
          MSR Nagar, Bangalore - 560054
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-primary/20">
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <CarSection />
      <GallerySection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
