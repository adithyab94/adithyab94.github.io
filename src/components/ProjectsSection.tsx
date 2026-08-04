import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, GitMerge } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: "World Model Optimization",
      desc: "Quantizing Large World Models for low-power edge silicon, enabling predictive action in unstructured environments.",
      tech: ["TensorRT", "CUDA", "ROS2"],
      icon: <Cpu className="text-slate-400" size={32} />
    },
    {
      title: "VLA for Real-Time Manipulation",
      desc: "Benchmarking and optimizing Vision-Language-Action models. Reducing inference latency from seconds to milliseconds.",
      tech: ["OpenVLA", "PyTorch", "Edge"],
      icon: <GitMerge className="text-slate-400" size={32} />
    },
    {
      title: "Vision-Based Bin-Picking",
      desc: "End-to-end integration of Computer Vision into ROS2 workflows for industrial automation and automotive complexity.",
      tech: ["OpenCV", "ROS2", "C++"],
      icon: <Eye className="text-slate-400" size={32} />
    }
  ];

  return (
    <section className="py-20">
      <div className="mb-16">
        <h2 className="text-3xl font-serif text-slate-900 mb-4">Selected Projects</h2>
        <div className="w-12 h-[1px] bg-slate-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group bg-white/30 backdrop-blur-md border border-slate-200/50 p-8 hover:bg-white/60 transition-colors shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-60 transition-opacity">
              {proj.icon}
            </div>
            <div className="mb-6 relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Project {String(idx + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-xl font-serif text-slate-900 mb-3 leading-snug relative z-10">{proj.title}</h3>
            <p className="text-sm text-slate-600 mb-10 font-light leading-relaxed relative z-10">
              {proj.desc}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 relative z-10">
              {proj.tech.map(t => (
                <span key={t} className="text-[10px] font-mono text-slate-500 bg-white/40 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
