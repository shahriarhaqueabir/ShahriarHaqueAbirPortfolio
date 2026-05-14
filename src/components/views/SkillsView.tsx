"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/data";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip as ChartTooltip } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip);

export default function SkillsView() {
  const skillsGroups = CONFIG.skills.filter(g => g.group !== 'Languages');
  const chartData = {
    labels: skillsGroups.map(g => g.group),
    datasets: [{
      label: 'Proficiency',
      data: skillsGroups.map(() => 85), // Default proficiency, can be refined in data.ts later
      backgroundColor: 'rgba(74, 144, 226, 0.1)',
      borderColor: '#4A90E2',
      pointBackgroundColor: '#4A90E2',
      pointBorderColor: '#F9F7F2',
      pointHoverBackgroundColor: '#F9F7F2',
      pointHoverBorderColor: '#4A90E2'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.05)' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        pointLabels: { color: '#2C2C2C', font: { family: 'Inter', size: 9, weight: 'bold' as const } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Capability Matrix</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Competencies</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
        <div className="lg:col-span-2 bg-white border border-(--border) p-8 h-[350px] flex flex-col">
          <h4 className="font-syne font-bold text-[10px] text-(--text-muted) mb-8 uppercase tracking-widest text-center">CORE ATTRIBUTES</h4>
          <div className="relative flex-1 w-full h-full">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)">
          {CONFIG.skills.map((group, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-(--bg) p-8 hover:bg-white transition-colors"
            >
              <h3 className="font-syne font-black text-(--text) text-lg mb-6 uppercase tracking-tighter">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span key={i} className="font-mono text-[9px] px-3 py-1.5 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter hover:border-(--text) hover:text-(--text) transition-all cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 pt-12 border-t border-(--border)">
        <h4 className="font-syne font-black text-3xl text-(--text) mb-10">Academic Foundation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CONFIG.education.map((edu, idx) => (
            <div key={idx} className="flex gap-8 items-start">
              <div className="w-16 h-16 border border-(--border) bg-white flex items-center justify-center shrink-0 rotate-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div>
                <h5 className="font-syne font-black text-xl text-(--text) leading-tight mb-2">{edu.degree}</h5>
                <div className="text-sm text-(--text-muted) mb-3 font-inter">{edu.school}</div>
                <div className="font-mono text-[10px] text-(--accent) font-bold uppercase tracking-widest">{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
