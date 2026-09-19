import AnimatedImpactStat from './components/AnimatedImpactStat';

const BACKGROUND_IMAGE =
  'https://res.cloudinary.com/dmzm3x2ai/image/upload/v1789642379/TFV05828_1_sijy69.jpg';

const LOGO =
  'https://res.cloudinary.com/dmzm3x2ai/image/upload/v1789643867/Co2_4__1_-removebg-preview_nkdist.png';

const NAV_LINKS = ['platform', 'solutions', 'company', 'support'];

/** glassmorphic pill shared by the brand mark and the nav links */
const GLASS_PILL =
  'bg-cocoa-950/40 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

export default function App() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* grounds the lower half so the bottom-left stat always stays legible */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-6 md:px-10 pt-6">
        <a
          href="#"
          aria-label="CO2.ZONE home"
          className={`flex items-center px-4 md:px-5 py-2 md:py-2.5 transition-colors hover:bg-cocoa-950/50 hover:border-white/25 ${GLASS_PILL}`}
        >
          <img
            src={LOGO}
            alt="CO2.ZONE"
            referrerPolicy="no-referrer"
            className="h-6 md:h-7 w-auto object-contain"
          />
        </a>

        <div className={`hidden md:flex items-center gap-1 px-3 py-2 ${GLASS_PILL}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-neutral-300 hover:text-white hover:bg-white/10 transition-colors text-sm px-5 py-2 rounded-full"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
        >
          get started
        </a>
      </nav>

      <div className="relative h-full w-full">
        <h1 className="hero-title absolute left-6 md:left-12 top-[16%] md:top-[17%] text-[13vw] md:text-[12vw] font-medium text-white mix-blend-difference">
          Smart,
        </h1>
        <h1 className="hero-title absolute right-6 md:right-12 top-[36%] md:top-[37%] text-[13vw] md:text-[12vw] font-medium text-white mix-blend-difference">
          simple,
        </h1>
        <h1 className="hero-title absolute left-1/2 -translate-x-1/2 top-[65%] md:top-[66%] text-[13vw] md:text-[11.5vw] font-medium text-white mix-blend-difference whitespace-nowrap text-center">
          seamless
        </h1>

        <p className="hidden md:block absolute left-6 md:left-12 top-[46%] max-w-[260px] md:max-w-[310px] text-[15px] leading-relaxed text-white mix-blend-difference">
          CO2.ZONE delivers smart web, app, and visual solutions through a
          seamless, effortless, and easygoing workflow.
        </p>

        <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12">
          <AnimatedImpactStat />
        </div>
      </div>
    </section>
  );
}
