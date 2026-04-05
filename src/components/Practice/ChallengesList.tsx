'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Star, Lock, CheckCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  xpReward: number;
  completed: boolean;
  tools: string[];
}

interface ChallengesListProps {
  challenges: Challenge[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onAttempt: (id: string) => void;
}

const difficultyConfig = {
  BEGINNER: { label: 'Principiante', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
  INTERMEDIATE: { label: 'Intermedio', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-500/10' },
  ADVANCED: { label: 'Avanzado', color: 'from-red-500 to-pink-500', bgColor: 'bg-red-500/10' },
};

export default function ChallengesList({
  challenges,
  selectedId,
  onSelect,
  onAttempt,
}: ChallengesListProps) {
  return (
    <div className="space-y-4">
      {challenges.map((challenge, index) => {
        const config = difficultyConfig[challenge.difficulty];
        const isSelected = selectedId === challenge.id;

        return (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(challenge.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              isSelected
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-purple-400 bg-gray-900/50 hover:bg-gray-900'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${config.bgColor}`}>
                {challenge.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Zap className="w-5 h-5 text-yellow-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  {challenge.completed && (
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs font-semibold text-green-400">
                      Completado
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {challenge.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs font-semibold text-purple-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${config.color} text-white`}>
                      {config.label}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-400">{challenge.xpReward} XP</span>
                    </div>
                  </div>

                  {!challenge.completed && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAttempt(challenge.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      Intentar
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
