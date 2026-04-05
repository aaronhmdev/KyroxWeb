'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Zap, TrendingUp, BookOpen, Code2, Users, Edit2, Save, X, Github, Instagram, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import type { User } from '@/types';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    github: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  });

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
      setFormData({
        name: data.name || '',
        bio: data.bio || '',
        github: data.github || '',
        instagram: data.instagram || '',
        twitter: data.twitter || '',
        linkedin: data.linkedin || '',
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const response = await fetch('/api/user/profile-update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsEditingProfile(false);
        // Success notification would go here
      } else {
        alert('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error al guardar');
    } finally {
      setIsSavingProfile(false);
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
        {/* Profile Section */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              Mi Perfil
            </h3>
            {!isEditingProfile ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </motion.button>
            ) : (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSavingProfile ? 'Guardando...' : 'Guardar'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditingProfile(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </motion.button>
              </div>
            )}
          </div>

          {isEditingProfile ? (
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">Descripción Personal</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 h-24 resize-none"
                  placeholder="Cuéntame sobre ti..."
                />
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-400 font-semibold mb-4">Redes Sociales</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Github className="w-4 h-4" /> GitHub
                    </label>
                    <input
                      type="text"
                      value={formData.github || ''}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      placeholder="usuario"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Twitter className="w-4 h-4" /> Twitter
                    </label>
                    <input
                      type="text"
                      value={formData.twitter || ''}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      placeholder="usuario"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Instagram className="w-4 h-4" /> Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.instagram || ''}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      placeholder="usuario"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin || ''}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      placeholder="usuario"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Nombre</p>
                <p className="text-white font-semibold">{user?.name || '-'}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Descripción</p>
                <p className="text-white">{user?.bio || 'Sin descripción'}</p>
              </div>

              <div>
                <p className="text-gray-400 font-semibold mb-3">Redes Sociales</p>
                <div className="flex gap-3">
                  {user?.github && (
                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition">
                      <Github className="w-5 h-5" />
                      <span className="text-sm">{user.github}</span>
                    </a>
                  )}
                  {user?.twitter && (
                    <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition">
                      <Twitter className="w-5 h-5" />
                      <span className="text-sm">{user.twitter}</span>
                    </a>
                  )}
                  {user?.instagram && (
                    <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition">
                      <Instagram className="w-5 h-5" />
                      <span className="text-sm">{user.instagram}</span>
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-500 transition">
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">{user.linkedin}</span>
                    </a>
                  )}
                  {!user?.github && !user?.twitter && !user?.instagram && !user?.linkedin && (
                    <p className="text-gray-500 text-sm">Agrega tus redes sociales</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
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
