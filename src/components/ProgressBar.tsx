'use client';

import { motion } from 'framer-motion';
import { Zap, Flame, CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  progress?: number;
  currentXP?: number;
  currentLevel?: number;
  xpToNextLevel?: number;
  streak?: number;
  completedChallenges?: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  label?: string;
}

export default function ProgressBar({
  progress = 0,
  currentXP = 0,
  currentLevel = 1,
  xpToNextLevel = 500,
  streak = 0,
  completedChallenges = 0,
  showPercentage = true,
  size = 'md',
  animated = true,
  label,
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));
  const xpProgressPercent = Math.min(100, (currentXP / xpToNextLevel) * 100);

  // If we have level info, show the detailed progress bar
  if (currentLevel) {
    return (
      <div className="space-y-6">
        {/* XP Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">XP Progress</span>
            <span className="text-sm font-bold gradient-text">{Math.round(currentXP)} / {Math.round(xpToNextLevel)} XP</span>
          </div>
          <div className={`w-full ${sizeClasses[size]} bg-gray-800/50 rounded-full overflow-hidden border border-gray-700`}>
            <motion.div
              key={`xp-progress-${currentXP}-${xpToNextLevel}`}
              initial="initial"
              animate="animate"
              variants={{
                initial: { width: '0%' },
                animate: { width: `${Math.min(100, Math.max(0, xpProgressPercent))}%` },
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-lg shadow-purple-500/50"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Nivel</p>
            <p className="text-2xl font-bold text-white">{currentLevel}</p>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <p className="text-gray-400 text-sm">Racha</p>
            </div>
            <p className="text-2xl font-bold text-orange-400">{streak}</p>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <p className="text-gray-400 text-sm">Completados</p>
            </div>
            <p className="text-2xl font-bold text-green-400">{completedChallenges}</p>
          </div>
        </div>
      </div>
    );
  }

  // Simple progress bar only
  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold gradient-text">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}

      <div className={`w-full ${sizeClasses[size]} bg-gray-800/50 rounded-full overflow-hidden border border-gray-700`}>
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-lg shadow-purple-500/50"
          />
        ) : (
          <div
            style={{ width: `${clampedProgress}%` }}
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 shadow-lg shadow-purple-500/50 transition-all duration-300"
          />
        )}
      </div>

      {showPercentage && !label && (
        <div className="text-right mt-1">
          <span className="text-xs font-bold gradient-text">{Math.round(clampedProgress)}%</span>
        </div>
      )}
    </div>
  );
}
