import React from 'react';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-slate-500 mb-6 tracking-widest text-xs font-mono uppercase flex items-center gap-3">
          <Cpu size={14} className="text-slate-400" />
          Adithya Balaji // Embodied AI
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }} 
            className="w-1.5 h-3 bg-slate-400 inline-block" 
          />
        </h2>
        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-slate-900 leading-[1.05] tracking-tight">
          Silicon<br />
          <span className="italic text-slate-600 font-light">meets action.</span>
        </h1>
        <p className="max-w-xl text-slate-600 leading-relaxed text-lg font-light">
          Edge AI & Robotics Engineer specializing in the deployment of 
          <span className="font-medium text-slate-800"> Vision-Language-Action (VLA) </span> 
          models. Currently optimizing high-parameter transformers for real-time robotic 
          control at <span className="font-medium text-slate-800">Neura Robotics</span>.
        </p>
      </motion.div>
    </section>
  );
};
