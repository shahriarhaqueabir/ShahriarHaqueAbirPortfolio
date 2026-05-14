"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/data";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip as ChartTooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Filler);

export default function ExperienceView() {
  const timelineData = [...CONFIG.experience].reverse();
  const chartData = {
    labels: timelineData.map(e => e.period.split(' – ')[0].split(' ').pop()),
    datasets: [{
      label: 'Professional Growth',
      data: timelineData.map((_, i) => 20 + (i * 20)), // Progressive growth visualization
      borderColor: '#4A90E2', 
      backgroundColor: 'rgba(74, 144, 226, 0.05)', 
      fill: true, 
      tension: 0.4,
      pointBackgroundColor: '#4A90E2', 
      pointBorderColor: '#F9F7F2', 
      pointRadius: 4, 
      pointHoverRadius: 6
    }]
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#2C2C2C', font: {family: 'Inter', size: 10} } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { display: false }, beginAtZero: true }
    },
    plugins: { legend: { display: false } },
    interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Career Trajectory</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Experience</h2>
      
      <div className="bg-white border border-(--border) p-8 mb-20 h-[300px]">
        <h4 className="font-syne font-bold text-[10px] text-(--text-muted) mb-6 uppercase tracking-widest">Impact Velocity & Scale Analysis</h4>
        <div className="relative w-full h-[200px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="relative space-y-px bg-(--border) border border-(--border)">
        {CONFIG.experience.map((e, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-(--bg) p-10 group hover:bg-white transition-colors relative"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1">
                <div className="text-(--accent) font-mono text-[10px] tracking-[0.2em] uppercase mb-2">{e.company}</div>
                <h3 className="text-3xl font-black font-syne text-(--text) mb-6 group-hover:text-(--accent) transition-colors">{e.role}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {e.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-4 text-sm text-(--text-muted) leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--accent)/30 mt-1.5 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-mono text-[10px] font-bold text-(--text) bg-(--bg) border border-(--border) px-4 py-2 uppercase tracking-widest group-hover:bg-(--accent) group-hover:text-white group-hover:border-(--accent) transition-all">
                {e.period}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
