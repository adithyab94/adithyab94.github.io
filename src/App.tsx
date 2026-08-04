/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiliconBackground } from './components/SiliconBackground';
import { HUD } from './components/HUD';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CVSection } from './components/CVSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (activeSection === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const sections = ['cv', 'projects', 'blog'];
      
      if (currentScrollY < 400) {
        setActiveSection('home');
        return;
      }

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nantesbuch inspired background colors
  const getBackgroundColor = () => {
    if (scrollY < 600) return '#f4efe6'; // Warm beige
    if (scrollY < 1400) return '#e8efe9'; // Soft sage green
    if (scrollY < 2200) return '#e6eaf0'; // Soft dusty blue
    return '#f0e6e6'; // Soft dusty rose
  };

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans transition-colors duration-1000 ease-in-out selection:bg-slate-300"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <SiliconBackground scrollY={scrollY} />
      <HUD />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 pb-32 relative z-10">
        <Hero />
        
        <div id="cv" className="pt-20">
          <CVSection />
        </div>
        
        <div id="projects" className="pt-20">
          <ProjectsSection />
        </div>
        
        <div id="blog" className="pt-20">
          <BlogSection />
        </div>
      </main>
    </div>
  );
}
