"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: 'React', category: 'Frontend', color: '#61DAFB', icon: '⚛️' },
  { name: 'Next.js', category: 'Frontend', color: '#000000', icon: '▲' },
  { name: 'TypeScript', category: 'Frontend', color: '#3178C6', icon: 'TS' },
  { name: 'Angular', category: 'Frontend', color: '#DD0031', icon: 'A' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', icon: '🎨' },
  { name: 'C#', category: 'Backend', color: '#239120', icon: 'C#' },
  { name: '.NET Core', category: 'Backend', color: '#512BD4', icon: '.NET' },
  { name: 'Node.js', category: 'Backend', color: '#339933', icon: '⬢' },
  { name: 'Python', category: 'Backend', color: '#3776AB', icon: '🐍' },
  { name: 'Azure', category: 'Cloud', color: '#0089D6', icon: '☁️' },
  { name: 'AWS', category: 'Cloud', color: '#FF9900', icon: 'AWS' },
  { name: 'Docker', category: 'Cloud', color: '#2496ED', icon: '🐳' },
  { name: 'Kubernetes', category: 'Cloud', color: '#326CE5', icon: 'K8s' },
  { name: 'Claude AI', category: 'AI', color: '#D97757', icon: '🤖' },
  { name: 'OpenAI', category: 'AI', color: '#10A37F', icon: 'AI' },
  { name: 'PostgreSQL', category: 'Database', color: '#336791', icon: '🐘' },
  { name: 'MongoDB', category: 'Database', color: '#47A248', icon: '🍃' },
  { name: 'SQL Server', category: 'Database', color: '#CC2927', icon: 'SQL' },
];

const categories = ['All', 'Frontend', 'Backend', 'Cloud', 'AI', 'Database'];

export default function TechStack3D() {
  const [filter, setFilter] = useState('All');

  const filteredTech = filter === 'All'
    ? techStack
    : techStack.filter(tech => tech.category === filter);

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technology Arsenal
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A comprehensive tech stack spanning modern web development, cloud infrastructure, and AI integration
          </motion.p>
        </div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tech stack grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          layout
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative"
            >
              <div
                className="relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl"
                style={{
                  backgroundColor: `${tech.color}10`,
                  borderColor: `${tech.color}40`,
                  boxShadow: `0 0 20px ${tech.color}20`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: `${tech.color}30` }}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{tech.name}</h3>
                  <p className="text-gray-400 text-xs">{tech.category}</p>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    border: `2px solid ${tech.color}`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            {filteredTech.length} technologies • Hover to see effects • Click categories to filter
          </p>
        </motion.div>
      </div>
    </section>
  );
}
