'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Github, Instagram, Twitter, Linkedin, Save, X, Trophy, Zap, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  createdAt: string;
  _count?: {
    followers: number;
    following: number;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
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
      window.location.href = '/auth/login';
      return;
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setProfile(data);
      setFormData({
        name: data.name || '',
        bio: data.bio || '',
        github: data.github || '',
        instagram: data.instagram || '',
        twitter: data.twitter || '',
        linkedin: data.linkedin || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user/profile-update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        setIsEditing(false);
        // Show success message
        alert('Perfil actualizado exitosamente');
      } else {
        alert('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="card p-12 text-center">
            <p className="text-gray-400">No se pudo cargar el perfil</p>
          </div>
        </div>
      </div>
    );
  }

  const xpInCurrentLevel = profile.xp % 500;
  const xpForCurrentLevel = 500;
  const progressPercentage = (xpInCurrentLevel / xpForCurrentLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      {/* Header Button */}
      <div className="max-w-2xl mx-auto px-6 mb-8 flex justify-end">
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
          >
            <Edit2 className="w-5 h-5" />
            Editar Perfil
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
            >
              <X className="w-5 h-5" />
              Cancelar
            </motion.button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-6"
      >
        <div className="card p-8">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name || 'User'}
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-lg object-cover border-2 border-purple-500"
                />
              ) : (
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                  {profile.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                    placeholder="Tu nombre"
                  />
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 h-20 resize-none"
                    placeholder="Cuéntame sobre ti..."
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-gray-400 text-sm mb-3">{profile.email}</p>
                  <p className="text-gray-300">{profile.bio || 'Sin descripción aún'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-slate-700">
            <div className="card p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Nivel</p>
              <p className="text-2xl font-bold text-yellow-400">{profile.level}</p>
            </div>
            <div className="card p-4 text-center">
              <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">XP</p>
              <p className="text-2xl font-bold text-purple-400">{profile.xp}</p>
            </div>
            <div className="card p-4 text-center">
              <TrendingUp className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Miembro desde</p>
              <p className="text-sm font-bold text-pink-400">{new Date(profile.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p className="text-gray-400">Progreso hacia Nivel {profile.level + 1}</p>
              <p className="text-gray-400">{xpInCurrentLevel} / {xpForCurrentLevel} XP</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pb-8 border-b border-slate-700">
            <p className="text-gray-400 font-semibold">Redes Sociales</p>
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub */}
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Github className="w-4 h-4" /> GitHub
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm placeholder-gray-500"
                    placeholder="usuario"
                  />
                ) : (
                  <p className="text-white">
                    {profile.github ? (
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        {profile.github}
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </p>
                )}
              </div>

              {/* Twitter */}
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm placeholder-gray-500"
                    placeholder="usuario"
                  />
                ) : (
                  <p className="text-white">
                    {profile.twitter ? (
                      <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        {profile.twitter}
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </p>
                )}
              </div>

              {/* Instagram */}
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.instagram || ''}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm placeholder-gray-500"
                    placeholder="usuario"
                  />
                ) : (
                  <p className="text-white">
                    {profile.instagram ? (
                      <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                        {profile.instagram}
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </p>
                )}
              </div>

              {/* LinkedIn */}
              <div>
                <label className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm placeholder-gray-500"
                    placeholder="usuario"
                  />
                ) : (
                  <p className="text-white">
                    {profile.linkedin ? (
                      <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                        {profile.linkedin}
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Seguidores</p>
              <p className="text-2xl font-bold text-purple-400">{profile._count?.followers || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Siguiendo</p>
              <p className="text-2xl font-bold text-pink-400">{profile._count?.following || 0}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
