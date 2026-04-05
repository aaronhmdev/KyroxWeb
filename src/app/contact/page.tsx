'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        (e.target as HTMLFormElement).reset();
        alert('¡Mensaje enviado correctamente!');
      }
    } catch (error) {
      alert('Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ponte en <span className="gradient-text">Contacto</span>
          </h1>
          <p className="text-gray-400 text-lg">
            ¿Preguntas? ¿Sugerencias? Nos encantaría escucharte
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: Mail,
              title: 'Email',
              value: 'hola@kyrox.com',
            },
            {
              icon: Phone,
              title: 'Teléfono',
              value: '+34 XXX XXX XXX',
            },
            {
              icon: MapPin,
              title: 'Ubicación',
              value: 'Online - Mundo',
            },
          ].map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">{info.title}</h3>
              <p className="text-gray-400">{info.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2.5 bg-kyrox-darker border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
