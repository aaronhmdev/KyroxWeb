'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  level: number;
  xp: number;
  _count?: {
    followers: number;
    following: number;
  };
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setUsers([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
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
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Comunidad Kyrox</h1>
            <p className="text-gray-400 text-lg">Descubre y conecta con otros programadores</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Busca usuarios por nombre..."
              className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Buscando usuarios...</p>
            </div>
          </div>
        ) : hasSearched && users.length === 0 ? (
          <div className="card p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No se encontraron usuarios</p>
            <p className="text-gray-500 text-sm mt-2">Intenta con otro nombre</p>
          </div>
        ) : !hasSearched ? (
          <div className="card p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Comienza a buscar</p>
            <p className="text-gray-500 text-sm mt-2">Escribe al menos 2 caracteres para buscar usuarios</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card p-6 hover:border-purple-500/50 transition-all"
              >
                <Link href={`/profile/${user.id}`} className="block group">
                  <div className="flex items-center gap-4 mb-4">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={60}
                        height={60}
                        className="w-16 h-16 rounded-lg object-cover border border-purple-500/50 group-hover:border-purple-500"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-bold group-hover:text-purple-400 transition">
                        {user.name}
                      </h3>
                      <p className="text-gray-400 text-sm">Nivel {user.level}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {user.bio || 'Sin descripción'}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <Zap className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <p className="text-gray-400">{user.xp} XP</p>
                    </div>
                    <div>
                      <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <p className="text-gray-400">Lvl {user.level}</p>
                    </div>
                    <div>
                      <Users className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                      <p className="text-gray-400">{user._count?.followers || 0}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
