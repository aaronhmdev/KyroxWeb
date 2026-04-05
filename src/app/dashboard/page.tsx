'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Zap, TrendingUp, BookOpen, Code2, Users } from 'lucide-react';
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
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 mb-12 flex justify-between items-start"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">
            ¡Bienvenido de vuelta, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-gray-400">Sigue aprendiendo y creciendo con Kyrox</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600/20 rounded-lg hover:bg-red-600/30 transition-colors"
        >
          Salir
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 space-y-8"
      >
        {/* Level & XP Section */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 text-sm">Nivel Actual</p>
              <h2 className="text-5xl font-bold gradient-text">{user.level}</h2>
            </div>
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-gray-400">Experiencia</p>
              <p className="font-medium">
                {user.xp} / {user.nextLevelXp} XP
              </p>
            </div>
            <div className="w-full h-3 bg-kyrox-darker rounded-full overflow-hidden border border-purple-500/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
              />
            </div>
          </div>
        </motion.div>

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
