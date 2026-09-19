import AnimatedImpactStat from './components/AnimatedImpactStat';

const BACKGROUND_IMAGE =
  'https://res.cloudinary.com/dmzm3x2ai/image/upload/v1789642379/TFV05828_1_sijy69.jpg';

// e_trim strips the transparent padding baked into the source PNG so the mark
// fills the pill optically without being cropped.
const LOGO_IMAGE =
  'https://res.cloudinary.com/dmzm3x2ai/image/upload/e_trim/v1789643867/Co2_4__1_-removebg-preview_nkdist.png';

const NAV_LINKS = ['platform', 'solutions', 'company', 'support'];

const GLASS_PILL =
  'bg-black/40 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

const App = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark chocolate wash keeps the palette on brand without tinting the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#120c0a]/20"
      />
      {/*
        Sits under the headlines so it only darkens the photo — the staggered
        type stays crisp and keeps blending against the image itself.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent"
      />

      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-4 px-6 md:px-10 pt-6">
        <a
          href="#"
          aria-label="CO2.ZONE home"
          className={`flex items-center justify-center rounded-full px-4 md:px-5 py-2 md:py-2.5 transition-colors hover:bg-black/50 hover:border-white/25 ${GLASS_PILL}`}
        >
          <img
            src={LOGO_IMAGE}
            alt="CO2.ZONE"
            referrerPolicy="no-referrer"
            className="h-5 md:h-[22px] w-auto object-contain"
          />
        </a>

        <div className={`hidden md:flex items-center gap-1 rounded-full px-3 py-2 ${GLASS_PILL}`}>
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

      {/* No z-index here: mix-blend-difference must blend against the photo. */}
      <div className="relative h-full w-full">
        <h1 className="hero-title absolute left-6 md:left-12 top-[16%] md:top-[17%] text-white mix-blend-difference font-medium tracking-tight text-[13vw] md:text-[12vw]">
          Smart,
        </h1>
        <h1 className="hero-title absolute right-6 md:right-12 top-[36%] md:top-[37%] text-white mix-blend-difference font-medium tracking-tight text-[13vw] md:text-[12vw]">
          simple,
        </h1>
        <h1 className="hero-title absolute left-1/2 -translate-x-1/2 top-[65%] md:top-[66%] text-center whitespace-nowrap text-white mix-blend-difference font-medium tracking-tight text-[13vw] md:text-[11.5vw]">
          seamless
        </h1>

        <p className="hidden md:block absolute left-6 md:left-12 top-[46%] max-w-[260px] md:max-w-[310px] text-[15px] leading-relaxed text-white mix-blend-difference">
          CO2.ZONE delivers smart web, app, and visual solutions through a
          seamless, effortless, and easygoing workflow.
        </p>

        <AnimatedImpactStat />
      </div>
    </section>
  );
};

export default App;
