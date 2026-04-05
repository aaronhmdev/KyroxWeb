'use client';

import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  Code2,
  BookOpen,
  Cpu,
  Package,
} from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  featured: boolean;
}

const RESOURCES: Resource[] = [
  // PLANTILLAS HTML/CSS
  {
    id: 'html-template-portfolio',
    title: 'Portfolio Template',
    description: 'Plantilla HTML5 profesional para portfolio personal. Fully responsive, accesible y SEO-friendly.',
    category: 'Plantillas HTML',
    url: 'https://github.com/kyrox/html-templates',
    icon: '🎨',
    featured: true,
  },
  {
    id: 'html-template-landing',
    title: 'Landing Page Template',
    description: 'Plantilla HTML + CSS moderna para landing pages. Incluye secciones hero, testimonios, pricing.',
    category: 'Plantillas HTML',
    url: 'https://github.com/kyrox/landing-pages',
    icon: '🚀',
    featured: true,
  },
  {
    id: 'html-template-blog',
    title: 'Blog Template',
    description: 'Sistema de blog estático con HTML/CSS. Perfecto para comenzar tu propio blog.',
    category: 'Plantillas HTML',
    url: 'https://github.com/kyrox/blog-template',
    icon: '📝',
    featured: false,
  },
  {
    id: 'css-framework',
    title: 'CSS Framework Gratuito',
    description: 'Framework CSS minimalista. Alternativa ligera a Bootstrap (10KB vs 200KB).',
    category: 'Plantillas HTML',
    url: 'https://github.com/kyrox/css-framework',
    icon: '🎯',
    featured: false,
  },

  // CÓDIGO GRATIS
  {
    id: 'js-components',
    title: 'Componentes JavaScript',
    description: 'Colección de componentes JavaScript vanilla: carousels, modals, navegación. Sin dependencias.',
    category: 'Código Gratis',
    url: 'https://github.com/kyrox/js-components',
    icon: '⚙️',
    featured: true,
  },
  {
    id: 'react-snippets',
    title: 'React Snippets',
    description: '50+ fragmentos de código React útiles. Hooks, componentes, patrones comunes.',
    category: 'Código Gratis',
    url: 'https://github.com/kyrox/react-snippets',
    icon: '⚛️',
    featured: true,
  },
  {
    id: 'nodejs-api',
    title: 'Node.js API Starter',
    description: 'Template listo para producción. Express, autenticación JWT, validación, logging.',
    category: 'Código Gratis',
    url: 'https://github.com/kyrox/node-api-starter',
    icon: '🔧',
    featured: false,
  },

  // APIs PÚBLICAS
  {
    id: 'jsonplaceholder',
    title: 'JSONPlaceholder',
    description: 'API REST fake pero real. Perfecta para testing y aprender API REST. Posts, usuarios, comentarios.',
    category: 'APIs Públicas',
    url: 'https://jsonplaceholder.typicode.com/',
    icon: '🌐',
    featured: true,
  },
  {
    id: 'poke-api',
    title: 'PokéAPI',
    description: 'API de Pokémon completamente gratuita. Datos de 1000+ pokémon, movimientos, habilidades.',
    category: 'APIs Públicas',
    url: 'https://pokeapi.co/',
    icon: '⚡',
    featured: true,
  },
  {
    id: 'open-weather',
    title: 'OpenWeatherMap',
    description: 'API gratuita de clima. Datos de tiempo, pronósticos, información geográfica.',
    category: 'APIs Públicas',
    url: 'https://openweathermap.org/api',
    icon: '🌦️',
    featured: false,
  },
  {
    id: 'github-api',
    title: 'GitHub API',
    description: 'API oficial de GitHub. Accede a datos de usuarios, repositorios, commits.',
    category: 'APIs Públicas',
    url: 'https://docs.github.com/en/rest',
    icon: '🐙',
    featured: false,
  },
  {
    id: 'swapi',
    title: 'Star Wars API',
    description: 'API libre de Star Wars. Datos de películas, personajes, planetas, naves.',
    category: 'APIs Públicas',
    url: 'https://swapi.dev/',
    icon: '⭐',
    featured: false,
  },

  // LIBROS PDF
  {
    id: 'book-eloquent-js',
    title: 'Eloquent JavaScript (Gratis)',
    description: 'El libro más popular para aprender JavaScript. Disponible totalmente gratis online.',
    category: 'Libros PDF',
    url: 'https://eloquentjavascript.net/',
    icon: '📚',
    featured: true,
  },
  {
    id: 'book-you-dont-know-js',
    title: 'You Don\'t Know JS Yet (Gratis)',
    description: 'Serie de libros profundos sobre JavaScript. Entiende cómo funciona realmente JS.',
    category: 'Libros PDF',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    icon: '📖',
    featured: true,
  },
  {
    id: 'book-css-tricks',
    title: 'CSS Tricks (Gratis)',
    description: 'Guías y artículos sobre CSS avanzado. Flexbox, Grid, animaciones, responsive design.',
    category: 'Libros PDF',
    url: 'https://css-tricks.com/',
    icon: '🎨',
    featured: false,
  },
  {
    id: 'book-web-design',
    title: 'Web Design in 4 Weeks (PDF)',
    description: 'Guía práctica de diseño web moderno. Desde conceptos hasta implementación.',
    category: 'Libros PDF',
    url: 'https://wedesignit.io/',
    icon: '🖼️',
    featured: false,
  },
];

const categories = [
  'Plantillas HTML',
  'Código Gratis',
  'APIs Públicas',
  'Libros PDF',
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Plantillas HTML':
      return <Code2 className="w-5 h-5" />;
    case 'Código Gratis':
      return <Package className="w-5 h-5" />;
    case 'APIs Públicas':
      return <Cpu className="w-5 h-5" />;
    case 'Libros PDF':
      return <BookOpen className="w-5 h-5" />;
    default:
      return <Download className="w-5 h-5" />;
  }
};

interface FilteredResources {
  [key: string]: Resource[];
}

export default function ResourcesPage() {
  const resourcesByCategory: FilteredResources = {};

  categories.forEach(category => {
    resourcesByCategory[category] = RESOURCES.filter(r => r.category === category);
  });

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
            Recursos Útiles
          </h1>
          <p className="text-xl text-gray-400">
            Colección curada de herramientas gratuitas para desarrolladores
          </p>
        </motion.div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">⭐ Destacados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.filter(r => r.featured).map((resource, index) => (
              <motion.a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card group hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                    {resource.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Resources by Category */}
        {categories.map((category, catIndex) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {getCategoryIcon(category)}
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesByCategory[category].map((resource, index) => (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (catIndex + 1) * 0.05 + index * 0.02 }}
                  className="card group hover:shadow-xl transition-all"
                >
                  <div className="text-3xl mb-3">{resource.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{resource.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold">
                    Ver recurso
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card text-center py-12 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            ¿Conoces un recurso útil?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Si tienes una herramienta, API o plantilla que crees que debería estar aquí,
            comparte con nosotros. Queremos mantener esta lista actualizada.
          </p>
          <a
            href="mailto:recursos@kyrox.dev"
            className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            Sugerir recurso
          </a>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8 mb-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">💡 Tips de uso</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-purple-400">✓</span>
              <span>
                <strong>Plantillas:</strong> Descarga y personaliza según necesites. Perfectas para mejorar tu portafolio.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">✓</span>
              <span>
                <strong>APIs:</strong> Prueba con proyectos pequeños primero. Todas están documentadas.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">✓</span>
              <span>
                <strong>Código:</strong> Lee el código de otros. Es la mejor forma de aprender.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">✓</span>
              <span>
                <strong>Libros:</strong> Dedica al menos 2-3 horas por semana a leer. La teoría es fundamental.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
