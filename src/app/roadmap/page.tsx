'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const roadmap = [
  {
    phase: 'Fundamentos',
    steps: [
      'HTML + CSS Básico',
      'Responsive Design',
      'Git & GitHub',
    ],
  },
  {
    phase: 'Frontend Avanzado',
    steps: [
      'JavaScript Moderno',
      'React Hooks',
      'State Management',
    ],
  },
  {
    phase: 'Backend',
    steps: [
      'Node.js & Express',
      'Bases de Datos',
      'APIs REST',
    ],
  },
  {
    phase: 'Full Stack',
    steps: [
      'Next.js Avanzado',
      'Autenticación',
      'Deployment',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu Ruta como <span className="gradient-text">Desarrollador</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Un camino estructurado hacia el Full Stack
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          {roadmap.map((phase, phaseIdx) => (
            <motion.div
              key={phaseIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: phaseIdx * 0.1 }}
              className="mb-12 last:mb-0"
            >
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold">
                  {phaseIdx + 1}
                </div>
                <h2 className="text-3xl font-bold">{phase.phase}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent" />
              </div>

              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-4 ml-5">
                {phase.steps.map((step, stepIdx) => (
                  <motion.div
                    key={stepIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (phaseIdx * 0.1) + (stepIdx * 0.05) }}
                    className="card"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <p className="font-medium">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Arrow */}
              {phaseIdx < roadmap.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            ¿Listo para comenzar tu viaje?
          </p>
          <a href="/courses" className="btn btn-primary">
            Explorar Cursos
          </a>
        </motion.div>
      </div>
    </div>
  );
}
