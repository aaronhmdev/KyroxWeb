'use client';

import { motion } from 'framer-motion';
import { Plus, Trash2, ExternalLink, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { status } = useSession();
  const [projects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Mis <span className="gradient-text">Proyectos</span>
            </h1>
            <p className="text-gray-400">Muestra el mundo lo que estás construyendo</p>
          </div>
          <button
            onClick={() => {
              if (status !== 'authenticated') {
                setShowLoginModal(true);
              } else {
                setShowForm(!showForm);
              }
            }}
            className="btn btn-primary gap-2"
          >
            <Plus className="w-5 h-5" />
            Nuevo Proyecto
          </button>
        </motion.div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Crear Nuevo Proyecto</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Mi increíble proyecto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                  placeholder="¿Qué hace tu proyecto?"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL Demo</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary">
                  Crear Proyecto
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <h3 className="text-2xl font-bold mb-2">Sin proyectos aún</h3>
            <p className="text-gray-400 mb-6">Comparte tu primer proyecto con la comunidad</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Crear Primer Proyecto
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card group"
              >
                {project.imageUrl && (
                  <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4" />
                )}
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-purple-600/20 rounded-lg text-sm font-medium hover:bg-purple-600/30 transition-colors flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver
                    </a>
                  )}
                  <button className="px-3 py-2 bg-red-600/20 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center max-w-md mx-4"
          >
            <LogIn className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Acceso Requerido</h2>
            <p className="text-gray-400 mb-6">Necesitas iniciar sesión para subir un proyecto</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <Link
                href="/auth/login"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Iniciar Sesión
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
