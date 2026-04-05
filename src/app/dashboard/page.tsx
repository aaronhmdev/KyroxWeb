'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Zap, TrendingUp, BookOpen, Code2, Users, Flame, Star } from 'lucide-react';
import type { User } from '@/types';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setUser(data);
      setAchievements(data.achievements || []);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  const xpProgress = (user.xp / user.nextLevelXp) * 100;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Welcome Header with Level & XP */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="card p-8 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -m-20" />
          
          <div className="relative grid md:grid-cols-3 gap-8 items-start">
            {/* Welcome Section */}
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-2">¡Bienvenido de vuelta!</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                ¡Hola, <span className="gradient-text">{user?.name}</span>!
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Continúa tu camino de aprendizaje con Kyrox
              </p>
              
              {/* XP Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <p className="text-gray-300">Experiencia</p>
                  </div>
                  <p className="font-bold text-white">
                    {user?.xp || 0} / {user?.nextLevelXp || 100} XP
                  </p>
                </div>
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden border border-purple-500/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((user?.xp || 0) / (user?.nextLevelXp || 100)) * 100}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  {Math.round((((user?.xp || 0) / (user?.nextLevelXp || 100)) * 100))}% hasta el siguiente nivel
                </p>
              </div>
            </div>

            {/* Level Card */}
            <div className="md:col-span-1 flex flex-col gap-4">
              {/* Big Level Display */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center shadow-xl shadow-purple-500/50"
              >
                <p className="text-gray-200 text-sm mb-2 opacity-90">NIVEL ACTUAL</p>
                <h2 className="text-7xl font-bold text-white mb-2">{user?.level || 1}</h2>
                <div className="h-1 w-12 bg-white/30 rounded-full mx-auto" />
              </motion.div>

              {/* Quick Stats */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-3 font-semibold">PRÓXIMO NIVEL</p>
                <p className="text-2xl font-bold text-purple-400">{(user?.level || 1) + 1}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Falta {((user?.nextLevelXp || 100) - (user?.xp || 0))} XP
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mt-8 pt-8 border-t border-slate-700 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 hover:border-red-500 rounded-lg text-red-300 hover:text-red-200 transition-all font-semibold"
            >
              Cerrar Sesión
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 space-y-8"
      >

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Cursos Completados</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <BookOpen className="w-12 h-12 text-purple-400 opacity-20" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Retos Completados</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Code2 className="w-12 h-12 text-pink-400 opacity-20" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Proyectos Subidos</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Code2 className="w-12 h-12 text-blue-400 opacity-20" />
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Logros Desbloqueados
            </h3>

            {achievements.length === 0 ? (
              <p className="text-gray-400">
                Completa cursos y retos para desbloquear logros
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-kyrox-darker border border-yellow-500/20 rounded-lg p-4 text-center hover:border-yellow-500/50 transition-colors"
                  >
                    <div className="text-4xl mb-2">{achievement.achievement.icon || '🏆'}</div>
                    <p className="font-medium">{achievement.achievement.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {achievement.achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <Link href="/courses"
            className="card group hover:border-purple-500 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Continuar Aprendiendo</h4>
                <p className="text-sm text-gray-400">Explora nuevos cursos</p>
              </div>
            </div>
          </Link>

          <Link href="/projects"
            className="card group hover:border-purple-500 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Ver Proyectos</h4>
                <p className="text-sm text-gray-400">Inspira-te con otros</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
