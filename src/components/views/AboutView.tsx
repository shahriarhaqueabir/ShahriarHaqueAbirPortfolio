"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/data";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AboutView() {
  const chartData = {
    labels: ['Consulting', 'Support', 'Development', 'Architecture'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ['#4A90E2', '#A5B4FC', '#2C2C2C', '#E5E7EB'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: false, 
    cutout: '80%',
    plugins: { 
      legend: { 
        position: 'right' as const, 
        labels: { color: '#2C2C2C', font: { family: 'Inter', size: 10 }, usePointStyle: true, boxWidth: 6 } 
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 max-w-5xl"
    >
      <div className="font-mono text-sm text-(--accent) uppercase tracking-widest mb-4">— Curator Biography</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">The Philosophy</h2>
      
      <div className="flex flex-col lg:flex-row gap-16 items-start mb-20">
        <div className="flex-1 relative">
          <div className="absolute -top-6 -left-6 text-8xl text-(--accent) opacity-10 font-serif select-none pointer-events-none">&ldquo;</div>
          <p className="text-2xl md:text-3xl text-(--text) leading-relaxed font-playfair italic relative z-10 border-l-4 border-(--accent)/20 pl-8">
            I believe that <span className="text-(--accent) not-italic font-bold">simplicity wins</span>. My work sits at the intersection of technical precision and human-centric creativity.
          </p>
          <p className="mt-8 text-lg text-(--text-muted) leading-relaxed font-inter">
            With over a decade of immersion in technical ecosystems, I approach every project as an architect would: balancing the structural integrity of the code with the lived experience of the user. I don&apos;t just build systems; I curate environments where technology feels natural and responsive.
          </p>
        </div>
        
        <div className="w-full lg:w-80 h-80 relative flex flex-col items-center">
          <div className="w-full h-64">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="text-center mt-6">
             <div className="text-[10px] font-mono text-(--text-muted) uppercase tracking-widest mb-1">Impact Velocity</div>
             <div className="text-xs font-bold text-(--text)">Balanced Distribution</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)">
        <div className="bg-(--bg) p-10 flex flex-col justify-center">
          <div className="text-[10px] font-mono text-(--accent) uppercase tracking-widest mb-4">Base Operations</div>
          <div className="font-syne font-black text-3xl text-(--text) flex items-center gap-3">
            {CONFIG.location}
          </div>
          <p className="mt-4 text-sm text-(--text-muted) max-w-[200px]">Active and available for on-site or remote engagement global-wide.</p>
        </div>
        <div className="bg-(--bg) p-10 flex flex-col justify-center">
          <div className="text-[10px] font-mono text-(--accent) uppercase tracking-widest mb-4">Legal Clearance</div>
          <div className="font-syne font-black text-2xl text-(--text)">
            {CONFIG.workAuth}
          </div>
          <p className="mt-4 text-sm text-(--text-muted)">Fully authorized and vetted for technical implementation consulting.</p>
        </div>
      </div>
    </motion.div>
  );
}
