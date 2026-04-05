'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, Mail, Zap } from 'lucide-react';

export default function CommunityPage() {
  const users = [
    { id: 1, name: 'Juan Desarrollador', level: 12, xp: 5420 },
    { id: 2, name: 'María Frontend', level: 8, xp: 3200 },
    { id: 3, name: 'Carlos Backend', level: 15, xp: 8900 },
  ];

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
            Comunidad <span className="gradient-text">Kyrox</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Conviértete en un Kyroxer y conecta con otros desarrolladores
          </p>
        </motion.div>

        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card text-center mb-12 py-12"
        >
          <Users className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h2 className="text-2xl font-bold mb-4">Únete a nuestra comunidad</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Forma parte de una comunidad de desarrolladores apasionados que comparten conocimiento, ayudan en proyectos y crecen juntos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Discord
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary gap-2"
            >
              <Mail className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            Top Kyroxers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {users.map((user, idx) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-kyrox-darker rounded-lg p-6 text-center border border-purple-500/20"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4 text-2xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">{user.name}</h3>
                <div className="inline-block bg-purple-500/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span className="font-bold text-purple-300">Nivel {user.level}</span>
                </div>
                <p className="text-gray-400 text-sm">{user.xp.toLocaleString()} XP</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="card">
            <h3 className="text-xl font-bold mb-4">¿Por qué unirse?</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Colabora en proyectos reales</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Aprende de otros desarrolladores</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Recibe feedback de tus proyectos</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Networking profesional</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Eventos Kyrox</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-2">
                <span className="text-purple-400">📅</span>
                <span>Webinars semanales</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">🏆</span>
                <span>Hackathones mensuales</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">💼</span>
                <span>Sesiones de mentoría</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">🚀</span>
                <span>Demo nights</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
