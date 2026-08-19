import { Bus, Github, Linkedin, Mail, MapPinned, ShieldCheck, Star } from "lucide-react";

const Footer = () => {
  const handleSearchClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    "About Us",
    "Popular Routes",
    "Support",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#020817] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">Travel smarter</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                Ready for your next journey?
              </h2>
            </div>

            <button
              onClick={handleSearchClick}
              className="rounded-2xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:bg-blue-600 md:px-8 md:py-4"
            >
              Search Buses
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <MapPinned size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Nationwide routes</h3>
              <p className="mt-2 text-sm text-slate-300">Explore trusted bus journeys across major cities and highways.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Safe & reliable</h3>
              <p className="mt-2 text-sm text-slate-300">Book with confidence using verified services and transparent details.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                <Star size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Top-rated experience</h3>
              <p className="mt-2 text-sm text-slate-300">Enjoy comfortable rides and smooth booking from start to finish.</p>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
            <Bus
              size={88}
              fill="#2563EB"
              stroke="#1E3A8A"
              strokeWidth={1.5}
              className="drop-shadow-[0_12px_18px_rgba(37,99,235,0.45)]"
            />
          </div>

          <svg viewBox="0 0 1200 230" className="h-52 w-full md:h-60" preserveAspectRatio="none">
            <defs>
              <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="-6" stdDeviation="8" floodColor="#000000" floodOpacity="0.45" />
              </filter>
            </defs>

            <path
              d="M0,76 C280,18 920,150 1200,76 L1200,132 C930,194 290,64 0,132 Z"
              fill="#374151"
              filter="url(#roadShadow)"
            />

            <path d="M0,76 C280,18 920,150 1200,76" stroke="#9CA3AF" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M0,132 C290,64 930,194 1200,132" stroke="#9CA3AF" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M0,104 C280,50 920,176 1200,104" stroke="#F9FAFB" strokeWidth="5" fill="none" strokeDasharray="28 22" strokeLinecap="round" />
          </svg>
        </div>

        <div className="relative z-10 mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-white">BookMyTrip</h3>
              <p className="mt-2 text-sm text-slate-300">Travel More. Worry Less.</p>
            </div>

            <nav className="flex flex-wrap justify-center gap-4 text-sm text-slate-300 md:justify-end">
              {footerLinks.map((link) => (
                <a key={link} href="#" className="transition hover:text-blue-300">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-xs text-slate-400 md:text-sm">Built with React • Node.js • Express • MongoDB</p>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="GitHub" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-blue-400 hover:text-blue-300">
                <Github size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-blue-400 hover:text-blue-300">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Email" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-blue-400 hover:text-blue-300">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-slate-400 md:text-sm">
            © 2026 BookMyTrip. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;