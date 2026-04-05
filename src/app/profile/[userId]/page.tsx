'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Github, Instagram, Twitter, Linkedin, Trophy, Zap, MessageCircle, UserPlus, UserCheck } from 'lucide-react';
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
  _count?: {
    followers: number;
    following: number;
  };
}

interface UserPageProps {
  params: {
    userId: string;
  };
}

export default function UserProfilePage({ params }: UserPageProps) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [params.userId]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${params.userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSendingMessage(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: params.userId,
          content: message,
        }),
      });

      if (response.ok) {
        setMessage('');
        alert('Mensaje enviado exitosamente');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSendingMessage(false);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="card p-12 text-center">
            <p className="text-gray-400">No se encontró el usuario</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
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
              <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-gray-400 text-sm mb-3">Nivel {profile.level}</p>
              <p className="text-gray-300 mb-6">{profile.bio || 'Sin descripción'}</p>

              {/* Action Buttons */}
              {session?.user?.email !== profile.email && (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
                  >
                    {isFollowing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Mensaje
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-slate-700">
            <div className="card p-4 text-center">
              <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">XP Total</p>
              <p className="text-2xl font-bold text-purple-400">{profile.xp}</p>
            </div>
            <div className="card p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Nivel</p>
              <p className="text-2xl font-bold text-yellow-400">{profile.level}</p>
            </div>
            <div className="card p-4 text-center">
              <MessageCircle className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Seguidores</p>
              <p className="text-2xl font-bold text-pink-400">{profile._count?.followers || 0}</p>
            </div>
          </div>

          {/* Social Links */}
          {(profile.github || profile.twitter || profile.instagram || profile.linkedin) && (
            <div className="space-y-4 pb-8 border-b border-slate-700">
              <p className="text-gray-400 font-semibold">Redes Sociales</p>
              <div className="flex gap-4">
                {profile.github && (
                  <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition">
                    <Github className="w-5 h-5" />
                    <span className="text-sm">{profile.github}</span>
                  </a>
                )}
                {profile.twitter && (
                  <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition">
                    <Twitter className="w-5 h-5" />
                    <span className="text-sm">{profile.twitter}</span>
                  </a>
                )}
                {profile.instagram && (
                  <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition">
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">{profile.instagram}</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-blue-500 transition">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">{profile.linkedin}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Send Message Section */}
          {session?.user?.email !== profile.email && (
            <div className="space-y-4">
              <p className="text-gray-400 font-semibold">Enviar Mensaje</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 resize-none h-24"
                placeholder="Escribe un mensaje..."
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendMessage}
                disabled={isSendingMessage || !message.trim()}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white transition"
              >
                {isSendingMessage ? 'Enviando...' : 'Enviar Mensaje'}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
