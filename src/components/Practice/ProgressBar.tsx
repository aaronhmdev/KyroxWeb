'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Flame, Target } from 'lucide-react';

interface ProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  streak: number;
  challengesCompleted: number;
}

export default function ProgressBar({
  currentXP,
  nextLevelXP,
  level,
  streak,
  challengesCompleted,
}: ProgressBarProps) {
  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="space-y-6">
      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-6 rounded-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">Progreso de Nivel</span>
          </div>
          <span className="text-sm font-mono text-gray-300">
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"
          />
        </div>

        {/* Percentage Text */}
        <div className="mt-2 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text"
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Level */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-500/30 p-4 rounded-lg text-center"
        >
          <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">{level}</div>
          <div className="text-xs text-gray-300 uppercase tracking-wider">Nivel Actual</div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 p-4 rounded-lg text-center"
        >
          <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">{streak}</div>
          <div className="text-xs text-gray-300 uppercase tracking-wider">Racha Actual</div>
        </motion.div>

        {/* Challenges Completed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 p-4 rounded-lg text-center"
        >
          <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">{challengesCompleted}</div>
          <div className="text-xs text-gray-300 uppercase tracking-wider">Retos Completados</div>
        </motion.div>
      </div>
    </div>
  );
}
