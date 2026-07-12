import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Biography", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certificates" },
    { name: "Publications", id: "publications" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating document header */}
      <div className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] xl:w-[75%] max-w-[104rem]">
        <nav className="relative border border-[var(--line-strong)] bg-[var(--paper)]/80 backdrop-blur-xl shadow-2xl shadow-black/40 px-5 lg:px-7 py-4 flex items-center justify-between transition-colors hover:border-[var(--ink-faint)]">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-baseline gap-2 group"
          >
            <span className="font-display text-2xl text-[var(--ink)] tracking-wide">SUDARSHAN HEGDE</span>
          </button>

          {/* Center tagline — very wide screens only 
          <p className="hidden 2xl:block font-display italic text-[var(--ink-dim)] text-base">
           text
          </p>
          */}

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map(({ name, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="mono-label hover:text-[var(--ink)] transition-colors pb-0.5 border-b border-transparent hover:border-[var(--ink)]"
              >
                {name}
              </button>
            ))}
            <Link
              to="/logs"
              onClick={() => setIsOpen(false)}
              className={`mono-label transition-colors pb-0.5 border-b ${
                location.pathname.startsWith('/logs')
                  ? 'text-[var(--ink)] border-[var(--ink)]'
                  : 'border-transparent hover:text-[var(--ink)] hover:border-[var(--ink)]'
              }`}
            >
              Logs
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden font-mono-ed text-[var(--ink)] text-xs border border-[var(--line-strong)] px-3 py-1.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
          >
            {isOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </nav>

        {/* Mobile dropdown — sibling of <nav>, not a child, so its own
            backdrop-filter samples the page instead of the blurred nav. */}
        {isOpen && (
          <div className="lg:hidden mt-2 border border-[var(--line-strong)] bg-[var(--paper)]/80 backdrop-blur-xl shadow-2xl shadow-black/40">
            <nav className="px-5 py-2 flex flex-col">
              {navLinks.map(({ name, id }, i) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="flex items-center justify-between py-3.5 border-b border-[var(--line)] text-left group"
                >
                  <span className="mono-label group-hover:text-[var(--ink)] transition-colors">
                    <span className="text-[var(--ink-faint)] mr-4">0{i + 1}</span>
                    {name}
                  </span>
                  <span className="font-mono-ed text-[var(--ink-faint)] text-xs group-hover:text-[var(--ink)] transition-colors">→</span>
                </button>
              ))}
              <Link
                to="/logs"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3.5 group"
              >
                <span className="mono-label group-hover:text-[var(--ink)] transition-colors">
                  <span className="text-[var(--ink-faint)] mr-4">06</span>
                  Logs
                </span>
                <span className="font-mono-ed text-[var(--ink-faint)] text-xs group-hover:text-[var(--ink)] transition-colors">→</span>
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Spacer — keeps page content below the fixed header */}
      <div className="h-24 md:h-28"></div>
    </>
  );
};

export default Navbar;
