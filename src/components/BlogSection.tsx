import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export const BlogSection = () => {
  const posts = [
    {
      date: "May 2024",
      title: "Why 8-bit Quantization is the Future of Physical AI",
      readTime: "5 min read"
    },
    {
      date: "Mar 2024",
      title: "Deploying OpenVLA on Edge Hardware: A Performance Breakdown",
      readTime: "8 min read"
    },
    {
      date: "Nov 2023",
      title: "From Pixels to Torques: The Transformer Revolution in Robotics",
      readTime: "12 min read"
    }
  ];

  return (
    <section className="py-20 pb-40">
      <div className="mb-16">
        <h2 className="text-3xl font-serif text-slate-900 mb-4 flex items-center gap-3">
          <Terminal className="text-slate-400" size={28} />
          Journal & Notes
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2.5 h-6 bg-slate-400 inline-block ml-1" />
        </h2>
        <div className="w-12 h-[1px] bg-slate-400" />
      </div>

      <div className="space-y-2">
        {posts.map((post, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer border-b border-slate-200/60 py-6 transition-all hover:border-slate-400"
          >
            <div className="flex-1 pr-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-3">{post.date}</span>
              <h3 className="text-xl font-serif text-slate-800 group-hover:text-slate-500 transition-colors">{post.title}</h3>
            </div>
            <span className="text-xs text-slate-400 font-light mt-4 md:mt-0 italic">{post.readTime}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
