'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, Zap } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'como-aprender-programacion',
    title: 'Cómo aprender programación desde cero en 2026',
    excerpt:
      'Una guía completa para comenzar tu viaje en la programación. Aprende el camino correcto, las herramientas adecuadas y cómo evitar los errores comunes.',
    author: 'Carlos Mendez',
    date: '15 de Marzo, 2026',
    category: 'Tutorial',
    readTime: 8,
    image: 'from-blue-600 to-blue-400',
    content: `
# Cómo aprender programación desde cero en 2026

Aprender programación puede parecer abrumador, pero con una estrategia clara, es totalmente alcanzable. En esta guía, te mostraré el camino más eficiente.

## 1. Elige tu primer lenguaje

JavaScript es la mejor opción para principiantes porque:
- Es fácil de aprender
- Inmediata retroalimentación en el navegador
- Enorme comunidad
- Altamente demandado en el mercado

## 2. Aprende los fundamentales

### HTML & CSS
- Estructura de documentos
- Semántica
- Diseño responsivo

### JavaScript
- Variables y tipos
- Funciones
- DOM manipulation
- Async/Await

## 3. Construye proyectos reales

No solo sigas tutoriales. Construye:
- Una página personal
- Una aplicación de tareas
- Un juego simple
- Una red social básica

## 4. Practica consistentemente

- 1 hora diaria es mejor que 8 horas un día
- Resuelve problemas en LeetCode
- Contribuye a proyectos open source
- Participa en hackathons

## 5. Especialízate

Una vez que domines JavaScript:
- Frontend: React, Vue, Angular
- Backend: Node.js, Express
- Full Stack: Next.js, Nuxt

La programación es una habilidad valiosa. ¡Comienza hoy!
    `,
  },
  {
    id: 'que-es-frontend-backend',
    title: 'Frontend vs Backend: Qué es y cuál elegir',
    excerpt:
      'Entiende las diferencias entre desarrollo frontend y backend. Descubre cuál es mejor para ti y qué necesitas aprender.',
    author: 'Marina García',
    date: '12 de Marzo, 2026',
    category: 'Conceptos',
    readTime: 6,
    image: 'from-purple-600 to-purple-400',
    content: `
# Frontend vs Backend: Qué es y cuál elegir

Uno de los primeros dilemas es elegir entre Frontend o Backend. Veamos en detalle qué hace cada uno.

## Frontend: El lado visible

Frontend es todo lo que ves en tu navegador. La interfaz, los botones, las animaciones.

### Tecnologías principales
- HTML: Estructura
- CSS: Estilos
- JavaScript: Interactividad
- Frameworks: React, Vue, Angular, Next.js

## Backend: El motor oculto

Backend es la lógica que funciona en el servidor. Es donde ocurren los cálculos.

### Tecnologías principales
- Node.js, Python, Java, C#
- Express, Django, Spring
- PostgreSQL, MongoDB, MySQL

## Full Stack

Muchos desarrolladores modernos aprenden ambas tecnologías.

### Ventajas
- Mayor flexibilidad laboral
- Mejor comprensión del flujo completo
- Mayor demanda en el mercado

Mi recomendación: Comienza con Frontend, porque es más visual y motivador.
    `,
  },
  {
    id: 'stacks-en-2026',
    title: 'Los mejores tech stacks en 2026',
    excerpt:
      'Descubre las combinaciones de tecnologías más demandadas en 2026 y cómo empezar con cada una.',
    author: 'Alex Rodriguez',
    date: '10 de Marzo, 2026',
    category: 'Tendencias',
    readTime: 10,
    image: 'from-pink-600 to-pink-400',
    content: `
# Los mejores tech stacks en 2026

El panorama tecnológico evoluciona rápidamente. Aquí están los stacks más demandados.

## 1. MERN Stack

### Tecnologías
- MongoDB (Base de datos NoSQL)
- Express.js (Backend)
- React (Frontend)
- Node.js (Runtime)

### Por qué es popular
- Todo JavaScript
- Scalable y flexible
- Comunidad enorme

## 2. Next.js + TypeScript

- Next.js (Full Stack React)
- TypeScript (Tipado seguro)
- Tailwind CSS (Estilos)
- PostgreSQL (DB)

### Ventajas
- Desarrollo rápido
- Type-safe
- Excelente rendimiento

## Tendencias en 2026

1. TypeScript es estándar
2. Edge Computing
3. AI Integration en todas partes
4. Real-time as Default
5. DevEx es prioritario

En 2026, elige el stack que resuelva tu problema específico.
    `,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Blog de Programación
          </h1>
          <p className="text-xl text-gray-400">
            Artículos, tutoriales y tendencias tech
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden mb-12 cursor-pointer hover:shadow-xl transition-all group"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div
              className={`h-80 bg-gradient-to-br ${BLOG_POSTS[0].image} flex items-center justify-center`}
            >
              <BookOpen className="w-20 h-20 text-white/30" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded bg-purple-500/20 text-purple-300">
                  {BLOG_POSTS[0].category}
                </span>
                <span className="text-xs text-gray-400">⭐ Destacado</span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">
                {BLOG_POSTS[0].title}
              </h2>

              <p className="text-gray-400 mb-6">{BLOG_POSTS[0].excerpt}</p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {BLOG_POSTS[0].author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {BLOG_POSTS[0].date}
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {BLOG_POSTS[0].readTime} min de lectura
                </div>
              </div>

              <Link
                href={`/blog/${BLOG_POSTS[0].id}`}
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors w-fit"
              >
                Leer artículo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {BLOG_POSTS.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="card overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div
                className={`h-48 bg-gradient-to-br ${post.image} flex items-center justify-center mb-4`}
              >
                <BookOpen className="w-12 h-12 text-white/30" />
              </div>

              {/* Content */}
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded bg-purple-500/20 text-purple-300">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 flex-1">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <Calendar className="w-3 h-3" />
                  {post.date.split(',')[0]}
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors w-fit"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card text-center py-12 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            ¿Quieres compartir tu conocimiento?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Estamos buscando autores que quieran contribuir artículos sobre desarrollo web,
            tendencias tech y educación en programación.
          </p>
          <a
            href="mailto:blog@kyrox.dev"
            className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            Contactar
          </a>
        </motion.div>
      </div>
    </div>
  );
}
