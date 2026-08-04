import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity } from 'lucide-react';

export const CVSection = () => {
  const experiences = [
    {
      period: "2024 — Present",
      role: "AI & Robotics Engineer",
      company: "Neura Robotics",
      location: "Munich, Germany",
      description: "Driving the transition from modular CV to end-to-end VLA models for industrial manipulation.",
      icon: <Cpu size={18} className="text-slate-400" />,
      details: [
        "Optimizing Transformer-based World Models for low-latency inference on edge silicon.",
        "Developing vision-based bin-picking systems for complex automotive logistics.",
        "Closing the loop between high-level reasoning and low-level torque control."
      ],
      tech: ["VLA", "PyTorch", "CUDA", "ROS2"]
    },
    {
      period: "2023 — 2024",
      role: "Embedded AI Engineer (R&D)",
      company: "Huber Automotive AG",
      location: "Ulm, Germany",
      description: "Focused on the intersection of Silicon and Perception. Optimized neural networks for safety-critical automotive hardware.",
      icon: <Zap size={18} className="text-slate-400" />,
      details: [
        "Deployed quantized AI models on microcontrollers using TensorFlow Lite.",
        "Integrated AI perception with ROS for autonomous mobile robotics.",
        "Adhered to ISO26262 and ASPICE standards for safety-critical edge deployment."
      ],
      tech: ["TensorFlow Lite", "C++", "Embedded Linux"]
    },
    {
      period: "2022",
      role: "AI Research Intern",
      company: "Reliev",
      location: "Nantes, France",
      description: "Researched biological signal processing using Machine Learning.",
      icon: <Activity size={18} className="text-slate-400" />,
      details: [
        "Developed seizure prediction models for epilepsy detection.",
        "Built real-time telemetry dashboards using Plotly and Dash."
      ],
      tech: ["Signal Processing", "Python"]
    }
  ];

  return (
    <section className="py-20">
      <div className="mb-16">
        <h2 className="text-3xl font-serif text-slate-900 mb-4">Curriculum Vitae</h2>
        <div className="w-12 h-[1px] bg-slate-400" />
      </div>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-slate-300/60" />

        <div className="space-y-32 md:space-y-48">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-10 md:pl-16 group"
            >
              <div className="absolute left-[3px] top-1.5 w-[9px] h-[9px] rounded-full bg-slate-200 border border-slate-400 group-hover:bg-slate-800 transition-colors" />
              
              <div className="max-w-2xl">
                <span className="text-[11px] text-slate-500 font-mono tracking-widest uppercase">{exp.period}</span>
                <div className="flex items-center gap-3 mt-2 mb-1">
                  {exp.icon}
                  <h3 className="text-2xl font-serif text-slate-900">{exp.role}</h3>
                </div>
                <p className="text-sm font-medium text-slate-700 mb-5">{exp.company} <span className="text-slate-400 font-normal ml-2">{exp.location}</span></p>

                <p className="text-slate-600 mb-6 font-light leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-sm text-slate-600 flex items-start gap-3 font-light leading-relaxed">
                      <span className="text-slate-300 mt-2 w-[3px] h-[3px] rounded-full bg-slate-400 block shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono tracking-widest text-slate-500 bg-white/40 border border-slate-200 px-3 py-1 rounded-full uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-slate-200/60">
         <div>
            <h4 className="text-[10px] font-mono text-slate-400 mb-4 tracking-widest uppercase">Education</h4>
            <p className="text-slate-900 font-serif text-xl">M.S. Advanced Robotics</p>
            <p className="text-sm text-slate-600 mt-2 font-light">Ecole Centrale de Nantes, France <br/> 2020 — 2022</p>
         </div>
         <div>
            <h4 className="text-[10px] font-mono text-slate-400 mb-4 tracking-widest uppercase">Languages</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 font-light">
              <span>English (Fluent)</span>
              <span>Tamil (Native)</span>
              <span>French (B2)</span>
              <span>German (A2)</span>
            </div>
         </div>
      </div>
    </section>
  );
};
