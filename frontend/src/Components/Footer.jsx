import { Bus, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    const handleSearchClick = ()=>{
        window.scrollTo({top:0, behavior: "smooth"})
    }
    return (
        <footer className="relative mt-20 bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#030712] text-white overflow-hidden">
            {/* CTA */}
            <div className="max-w-5xl mx-auto px-6 pt-20 text-center">
                <h2 className="text-5xl font-bold">
                    Ready for your next journey?
                </h2>

                <p className="mt-5 text-lg text-gray-300">
                    Discover routes across India and book your bus in just a few clicks.
                </p>

                <button 
                className="mt-8 rounded-xl bg-[#2563EB] px-8 py-4 text-lg font-semibold shadow-xl transition hover:bg-blue-700"
                onClick={handleSearchClick}>
                    Search Buses
                </button>
            </div>

            {/* Road */}
            <div className="relative mt-16">
                {/* Bus — sits at the crest of the curve, x=600 is the midpoint of the road's dip */}
                <div className="absolute left-1/2 top-12 z-20 -translate-x-1/2">
                    <Bus
                        size={99}
                        fill="#2563EB"
                        stroke="#1E3A8A"
                        strokeWidth={1.5}
                        className="drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
                    />
                </div>

                <svg
                    viewBox="0 0 1200 240"
                    className="w-full h-64"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <filter
                            id="roadShadow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feDropShadow
                                dx="0"
                                dy="-6"
                                stdDeviation="8"
                                floodColor="#000000"
                                floodOpacity="0.45"
                            />
                        </filter>
                    </defs>

                    {/* Road surface */}
                    <path
                        d="
                            M0,80
                            C300,10 900,150 1200,80
                            L1200,140
                            C900,210 300,70 0,140
                            Z
                        "
                        fill="#4B5563"
                        filter="url(#roadShadow)"
                    />

                    {/* Road edges */}
                    <path
                        d="M0,80 C300,10 900,150 1200,80"
                        stroke="#9CA3AF"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0,140 C300,70 900,210 1200,140"
                        stroke="#9CA3AF"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Dashed centre line */}
                    <path
                        d="M0,110 C300,40 900,180 1200,110"
                        stroke="#F9FAFB"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="30 22"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Footer Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                <h3 className="text-center text-4xl font-bold">
                    BookMyTrip
                </h3>

                <p className="mt-3 text-center text-lg text-gray-300">
                    Travel More. Worry Less.
                </p>

                <p className="mt-2 text-center text-gray-500">
                    Built with React • Node.js • Express • MongoDB
                </p>

                <div className="mt-10 flex justify-center gap-8">
                    <a
                        href="#"
                        className="transition hover:text-[#2563EB]"
                    >
                        <Github size={28} />
                    </a>

                    <a
                        href="#"
                        className="transition hover:text-[#2563EB]"
                    >
                        <Linkedin size={28} />
                    </a>

                    <a
                        href="#"
                        className="transition hover:text-[#2563EB]"
                    >
                        <Mail size={28} />
                    </a>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6">
                    <p className="text-center text-gray-500">
                        © 2026 BookMyTrip. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;