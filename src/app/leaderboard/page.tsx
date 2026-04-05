'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Medal, Zap, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  xp: number;
  image?: string;
  rank: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        
        // Validar que la respuesta es un array
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.error('Invalid leaderboard data:', data);
          setLeaderboard([]);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-gray-500';
    }
  };

  const getRankBadgeClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">TOP Kyroxes</h1>
            <p className="text-gray-400 text-lg">Los mejores programadores de la comunidad</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Usuarios Activos</p>
                <p className="text-2xl font-bold text-yellow-400">{leaderboard.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400 opacity-50" />
            </div>
          </div>
          <div className="card p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">XP Promedio</p>
                <p className="text-2xl font-bold text-purple-400">
                  {leaderboard.length > 0
                    ? Math.round(leaderboard.reduce((sum, u) => sum + u.xp, 0) / leaderboard.length)
                    : 0}
                </p>
              </div>
              <Zap className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>
          <div className="card p-4 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Nivel Máximo</p>
                <p className="text-2xl font-bold text-pink-400">
                  {leaderboard.length > 0 ? Math.max(...leaderboard.map(u => u.level)) : 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-400 opacity-50" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Cargando ranking...</p>
            </div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="card p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay usuarios en el ranking aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card p-4 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div
                    className={`${getRankBadgeClass(user.rank)} w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0`}
                  >
                    {user.rank <= 3 ? (
                      <Medal className={`w-6 h-6 ${getMedalColor(user.rank)}`} />
                    ) : (
                      <span className="text-sm">{user.rank}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {user.image && (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="text-white font-semibold">{user.name}</h3>
                        <p className="text-gray-400 text-sm">Nivel {user.level}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-lg font-bold text-white">{user.xp}</span>
                    </div>
                    <p className="text-gray-400 text-sm">XP Total</p>
                  </div>

                  {/* Trending */}
                  {user.rank <= 3 && (
                    <div className="ml-4">
                      <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
