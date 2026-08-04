import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'motion/react';

export const SiliconBackground = ({ scrollY = 0 }: { scrollY?: number }) => {
  const isVLA = scrollY > 600 && scrollY < 2600; 

  // Generate deterministic circuit traces, denser and slightly darker
  const traces = Array.from({ length: 60 }).map((_, i) => {
    const startX = (i * 137) % 2000;
    const startY = (i * 193) % 2000;
    const dirX = i % 2 === 0 ? 1 : -1;
    const dirY = i % 3 === 0 ? 1 : -1;
    const midX = startX + (dirX * (50 + (i * 17) % 150));
    const midY = startY + (dirY * (50 + (i * 23) % 150));
    const endX = midX + (i % 4 === 0 ? 0 : dirX * (150 + (i * 11) % 100));
    const endY = midY + (i % 4 === 0 ? dirY * (150 + (i * 13) % 100) : 0);
    return { startX, startY, midX, midY, endX, endY, delay: (i * 37) % 5, duration: 3 + (i % 3) };
  });

  // Fixed Y offset for the VLA center line to dodge text
  const vlaY = 250;
  const vlaYRef = useRef(vlaY);
  vlaYRef.current = vlaY;

  const tokenRef1 = useRef<SVGGElement>(null);
  const tokenRef2 = useRef<SVGGElement>(null);

  useAnimationFrame((time) => {
    const duration = 4000;
    
    const updateToken = (ref: React.RefObject<SVGGElement>, timeOffset: number) => {
      if (!ref.current) return;
      const t = ((time + timeOffset) % duration) / duration;
      const currentY = vlaYRef.current;
      
      let x, y;
      
      if (t < 0.25) {
         x = 200;
         y = 500;
      } else if (t < 0.60) { 
        const ct = (t - 0.25) / 0.35;
        x = Math.pow(1 - ct, 3) * 200 + 3 * Math.pow(1 - ct, 2) * ct * 350 + 3 * (1 - ct) * Math.pow(ct, 2) * 350 + Math.pow(ct, 3) * 535;
        y = Math.pow(1 - ct, 3) * 500 + 3 * Math.pow(1 - ct, 2) * ct * 500 + 3 * (1 - ct) * Math.pow(ct, 2) * currentY + Math.pow(ct, 3) * currentY;
      } else if (t < 0.95) {
        const ct = (t - 0.60) / 0.35;
        x = Math.pow(1 - ct, 3) * 535 + 3 * Math.pow(1 - ct, 2) * ct * 720 + 3 * (1 - ct) * Math.pow(ct, 2) * 720 + Math.pow(ct, 3) * 870;
        y = Math.pow(1 - ct, 3) * currentY + 3 * Math.pow(1 - ct, 2) * ct * currentY + 3 * (1 - ct) * Math.pow(ct, 2) * 500 + Math.pow(ct, 3) * 500;
      } else {
        x = 870;
        y = 500;
      }
      
      let opacity = 1;
      if (t < 0.25) opacity = 0;
      else if (t < 0.28) opacity = (t - 0.25) / 0.03;
      else if (t > 0.95) opacity = 0;
      else if (t > 0.92) opacity = (0.95 - t) / 0.03;

      ref.current.setAttribute('transform', `translate(${x}, ${y})`);
      ref.current.setAttribute('opacity', opacity.toString());
    };

    updateToken(tokenRef1, 0);
    updateToken(tokenRef2, duration / 2);
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000">
      {/* Soft geometric/circuit overlay */}
      <div className="absolute inset-0 opacity-[0.04]" 
           style={{ backgroundImage: `radial-gradient(#000000 1.5px, transparent 1.5px)`, backgroundSize: '32px 32px' }} 
      />
      
      {/* Circuit Board Animation */}
      <motion.svg 
        className="absolute w-full h-full" 
        style={{ opacity: 0.15 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2000 2000"
        preserveAspectRatio="xMidYMid slice"
        animate={{ opacity: isVLA ? 0 : 0.15 }}
        transition={{ duration: 1.5 }}
      >
        {traces.map((t, i) => (
          <g key={i}>
            <path d={`M ${t.startX} ${t.startY} L ${t.midX} ${t.startY} L ${t.midX} ${t.midY} L ${t.endX} ${t.endY}`} fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <circle cx={t.endX} cy={t.endY} r="3" fill="none" stroke="#000" strokeWidth="2" opacity="0.6"/>
            <motion.circle r="3" fill="#fef08a" stroke="#000" strokeWidth="1"
              animate={{ 
                cx: [t.startX, t.midX, t.midX, t.endX], 
                cy: [t.startY, t.startY, t.midY, t.endY] 
              }}
              transition={{ duration: t.duration, repeat: Infinity, ease: "linear", delay: t.delay }}
            />
          </g>
        ))}
      </motion.svg>

      {/* VLA Token Flow Animation */}
      <motion.svg 
        className="absolute w-full h-full" 
        style={{ opacity: 0.4 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMid slice"
        animate={{ opacity: isVLA ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Input Blocks - Left and Right Margins */}
        <rect x="120" y="200" width="80" height="600" rx="8" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
        <text x="160" y="500" textAnchor="middle" fill="#000" fontSize="18" fontFamily="ArtCompany, sans-serif" fontWeight="bold" opacity="0.4" transform="rotate(-90 160 500)">ENCODER</text>

        <rect x="870" y="200" width="80" height="600" rx="8" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
        <text x="910" y="500" textAnchor="middle" fill="#000" fontSize="18" fontFamily="ArtCompany, sans-serif" fontWeight="bold" opacity="0.4" transform="rotate(90 910 500)">DECODER</text>

        {/* Input Lines */}
        <path d="M 0 350 L 120 350" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2" />
        <path d="M 0 500 L 120 500" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2" />
        <path d="M 0 650 L 120 650" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2" />

        {/* Dynamic Center Connection Line */}
        <motion.path 
          d={`M 200 500 C 350 500, 350 ${vlaY}, 535 ${vlaY} C 720 ${vlaY}, 720 500, 870 500`} 
          fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"
          animate={{ d: `M 200 500 C 350 500, 350 ${vlaY}, 535 ${vlaY} C 720 ${vlaY}, 720 500, 870 500` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* Output Line */}
        <path d="M 950 500 L 1200 500" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2" />

        {/* Input Tokens */}
        {/* Vision */}
        <motion.g
          animate={{ x: [-20, 120, 120], opacity: [0, 1, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.25, 1], delay: 0 }}
        >
          <rect x="-12" y="340" width="24" height="20" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
          <circle cx="-3" cy="347" r="2" fill="#3b82f6"/>
          <path d="M -12 354 L -4 348 L 4 354 L 8 351 L 12 355" fill="none" stroke="#3b82f6" strokeWidth="2"/>
        </motion.g>

        {/* Language */}
        <motion.g
          animate={{ x: [-20, 120, 120], opacity: [0, 1, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.25, 1], delay: 0.1 }}
        >
          <rect x="-10" y="488" width="20" height="24" rx="2" fill="#fff" stroke="#ec4899" strokeWidth="2"/>
          <path d="M -5 494 L 5 494 M -5 500 L 5 500 M -5 506 L 1 506" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        </motion.g>

        {/* State */}
        <motion.g
          animate={{ x: [-20, 120, 120], opacity: [0, 1, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.25, 1], delay: 0.2 }}
        >
           <rect x="-10" y="640" width="20" height="20" rx="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
           <circle cx="-4" cy="647" r="1.5" fill="#10b981"/>
           <circle cx="4" cy="647" r="1.5" fill="#10b981"/>
           <path d="M -4 654 L 4 654" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        </motion.g>

        {/* Traveling Ticket Tokens */}
        <g ref={tokenRef1} opacity="0">
          <path d="M -16 -10 L 16 -10 L 16 -4 A 4 4 0 0 1 16 4 L 16 10 L -16 10 L -16 4 A 4 4 0 0 1 -16 -4 Z" fill="#fef08a" stroke="#000" strokeWidth="2" />
          <path d="M -4 -4 L 4 -4 M -4 0 L 4 0 M -4 4 L 4 4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g ref={tokenRef2} opacity="0">
          <path d="M -16 -10 L 16 -10 L 16 -4 A 4 4 0 0 1 16 4 L 16 10 L -16 10 L -16 4 A 4 4 0 0 1 -16 -4 Z" fill="#fef08a" stroke="#000" strokeWidth="2" />
          <path d="M -4 -4 L 4 -4 M -4 0 L 4 0 M -4 4 L 4 4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Output Token (Robot) */}
        <motion.g
          animate={{ 
            x: [ 870, 870, 870, 1200 ], 
            opacity: [ 0, 0, 1, 0 ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.94, 0.95, 1], delay: 0 }}
        >
          <g transform="translate(0, 500) scale(1.1)">
             <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#fef08a" stroke="#000" strokeWidth="2"/>
             <circle cx="-4" cy="-4" r="2" fill="#000"/>
             <circle cx="4" cy="-4" r="2" fill="#000"/>
             <path d="M -5 5 L 5 5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
             <path d="M -12 0 L -16 0 M 12 0 L 16 0 M 0 -12 L 0 -16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </motion.g>

        {/* Output Token 2 (Robot) */}
        <motion.g
          animate={{ 
            x: [ 870, 870, 870, 1200 ], 
            opacity: [ 0, 0, 1, 0 ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.94, 0.95, 1], delay: 2 }}
        >
          <g transform="translate(0, 500) scale(1.1)">
             <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#fef08a" stroke="#000" strokeWidth="2"/>
             <circle cx="-4" cy="-4" r="2" fill="#000"/>
             <circle cx="4" cy="-4" r="2" fill="#000"/>
             <path d="M -5 5 L 5 5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
             <path d="M -12 0 L -16 0 M 12 0 L 16 0 M 0 -12 L 0 -16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </motion.g>
      </motion.svg>

      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
    </div>
  );
};



