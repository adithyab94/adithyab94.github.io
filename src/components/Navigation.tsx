import React from 'react';

export const Navigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const navItems = [
    { name: 'Home', id: 'home', hidden: true },
    { name: 'Vitae', id: 'cv' },
    { name: 'Projects', id: 'projects' },
    { name: 'Journal', id: 'blog' },
  ];

  const socialItems = [
    { name: 'GitHub', link: 'https://github.com/adithyabalaji' },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/adithyabalaji' }
  ];

  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 sm:px-10 py-4 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-full z-50 flex items-center gap-4 sm:gap-8 font-sans w-[90%] sm:w-auto max-w-fit overflow-x-auto no-scrollbar">
      <nav className="flex gap-5 sm:gap-8 shrink-0">
        {navItems.filter(item => !item.hidden).map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveSection(item.id)}
            className={`text-xs sm:text-sm tracking-wide transition-colors whitespace-nowrap ${activeSection === item.id ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900'}`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="w-[1px] h-4 bg-slate-300 shrink-0" />

      <div className="flex gap-5 sm:gap-6 items-center shrink-0">
        {socialItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {item.name}
          </a>
        ))}
      </div>
    </footer>
  );
};
