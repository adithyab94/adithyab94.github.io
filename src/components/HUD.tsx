import React from 'react';

export const HUD = () => (
  <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 sm:px-12 z-50">
    <div className="absolute inset-0 bg-white/20 backdrop-blur-md border-b border-black/5" />
    <div className="relative z-10 flex items-center gap-6">
      <div>
        <h1 className="text-xl font-serif font-medium tracking-wide text-slate-900">Adithya Balaji</h1>
        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Edge AI & Robotics</p>
      </div>
    </div>
    <div className="relative z-10 flex gap-8 text-[11px] items-center font-mono tracking-wider text-slate-500 hidden sm:flex">
      <div className="flex flex-col items-end">
        <span>Status</span>
        <span className="text-slate-800">Optimized</span>
      </div>
      <div className="flex flex-col items-end">
        <span>Latency</span>
        <span className="text-slate-800">12.4ms</span>
      </div>
    </div>
  </header>
);

