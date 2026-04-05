'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen, Code2, Trophy, Users, Music, Mail, Zap, Home, LogOut, User, MessageCircle } from 'lucide-react';

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session: initialSession }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/courses', label: 'Cursos', icon: BookOpen },
    { href: '/practice', label: 'Práctica', icon: Code2 },
    { href: '/projects', label: 'Proyectos', icon: Trophy },
    { href: '/leaderboard', label: 'TOP', icon: Zap },
    { href: '/community', label: 'Comunidad', icon: Users },
    { href: '/blog', label: 'Blog', icon: Music },
    { href: '/resources', label: 'Recursos', icon: Music },
    { href: '/contact', label: 'Contacto', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-gradient-to-b from-[rgba(15,15,30,0.95)] to-[rgba(10,10,20,0.8)] border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl group relative">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50"
            >
              <span className="text-white font-black text-lg">K</span>
            </motion.div>
            <div>
              <span className="gradient-text text-2xl font-bold">Kyrox</span>
              <div className="text-xs text-purple-300">Learn Building</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1 items-center">
            {navLinks.slice(0, 5).map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg hover:bg-purple-500/10 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  <span className="group-hover:text-purple-400 transition-colors">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex gap-3 items-center">
            {/* Desktop Auth */}
            <div className="hidden md:flex gap-2">
              {session && session.user ? (
                <>
                  <Link
                    href="/messages"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 transition-all border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Mensajes
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 transition-all border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600/20 hover:bg-red-600/40 transition-all border border-red-500/30 hover:border-red-500/60 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-500/20 transition-all flex items-center gap-2"
                  >
                    <span>Ingresar</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Registrarse
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-gradient-to-b from-[rgba(15,15,30,0.95)] to-[rgba(10,10,20,0.8)] border-b border-purple-500/20 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-6 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-purple-500/10 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="font-medium group-hover:text-purple-300 transition-colors">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Auth */}
            <div className="border-t border-purple-500/20 pt-4 mt-4 space-y-3">
              {session && session.user ? (
                <>
                  <Link
                    href="/messages"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Mensajes
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <Trophy className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-red-600/30 font-semibold hover:bg-red-600/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="w-full px-4 py-3 rounded-lg border border-purple-500/50 font-semibold text-center hover:bg-purple-500/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
