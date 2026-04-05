'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
  LogIn,
} from 'lucide-react';
import Link from 'next/link';
import CourseSlideshow from '@/components/CourseSlideshow';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'BASICO' | 'INTERMEDIO' | 'AVANZADO';
  videoUrl?: string;
  pdfUrl?: string;
  content: string;
  duration: number;
  students?: number;
}

interface CourseWithProgress extends Course {
  completed?: boolean;
  progress?: number;
}

const MOCK_COURSES: Course[] = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    description: 'Aprende los fundamentos de HTML, la base de la web.',
    category: 'Frontend',
    level: 'BASICO',
    duration: 600,
    students: 1250,
    content: `
# HTML Fundamentals

## 1. Introducción a HTML
HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web.

### Conceptos Clave:
- Estructura semántica
- Elementos y atributos
- HTML5 características

## 2. Estructura Básica
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Hola Mundo</h1>
  </body>
</html>
\`\`\`

## 3. Elementos Comunes
- Textos: h1-h6, p, span
- Listas: ul, ol, li
- Enlaces: a
- Imágenes: img
- Formularios: form, input, button

## 4. Práctica
Crea una página con:
- Un encabezado
- Una lista de 5 elementos
- Un formulario con nombre y email
- Un enlace a un sitio web
    `,
  },
  {
    id: 'css-styling',
    title: 'CSS Styling & Layout',
    description: 'Domina CSS para crear diseños hermosos y responsivos.',
    category: 'Frontend',
    level: 'BASICO',
    duration: 720,
    students: 1100,
    content: `
# CSS Styling & Layout

## 1. Selectores CSS
- Por clase: .className
- Por ID: #idName
- Por elemento: div, p
- Combinadores: >, +, ~

## 2. Propiedades Esenciales
- Color y fondo
- Tipografía: font-family, size, weight
- Espaciado: margin, padding
- Bordes: border, border-radius

## 3. Flexbox
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## 4. Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## 5. Media Queries
\`\`\`css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

## 6. Proyecto Final
Crea un portfolio responsivo con:
- Header con navegación
- Hero section
- Tarjetas de proyectos
- Footer
    `,
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    description: 'Domina los conceptos esenciales de JavaScript.',
    category: 'Frontend',
    level: 'BASICO',
    duration: 840,
    students: 2050,
    content: `
# JavaScript Fundamentals

## 1. Variables y Tipos
\`\`\`javascript
const nombre = "Juan";
let edad = 25;
var activo = true;

const numero = 42;
const decimales = 3.14;
const arreglo = [1, 2, 3];
const objeto = { key: "value" };
\`\`\`

## 2. Funciones
\`\`\`javascript
// Arrow function
const sumar = (a, b) => a + b;

// Función tradicional
function multiplicar(a, b) {
  return a * b;
}
\`\`\`

## 3. Control de Flujo
- if/else
- switch
- for, while
- forEach, map, filter

## 4. DOM Manipulation
\`\`\`javascript
const elemento = document.getElementById('id');
elemento.textContent = 'Nuevo contenido';
elemento.addEventListener('click', () => {
  console.log('Clickeado');
});
\`\`\`

## 5. Proyecto: Calculadora Interactiva
- Crear interfaz con botones
- Capturar clics
- Realizar cálculos
- Mostrar resultados
    `,
  },
  {
    id: 'react-intro',
    title: 'React Basics',
    description: 'Introduce a React y los componentes declarativos.',
    category: 'Frontend',
    level: 'INTERMEDIO',
    duration: 900,
    students: 1800,
    content: `
# React Basics

## 1. Componentes
\`\`\`jsx
function NombreComponente() {
  return <div>Contenido</div>;
}

const ComponenteNuevo = () => {
  return <h1>Hola React</h1>;
};
\`\`\`

## 2. JSX
- HTML en JavaScript
- Atributos: className, onClick
- Variables: {variable}
- Condicionales y loops

## 3. Hooks
\`\`\`javascript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Componente renderizado');
  }, [count]);
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
\`\`\`

## 4. Props
- Pasar datos a componentes
- Validación con PropTypes
- Valores por defecto

## 5. Proyecto: Lista de Tareas
- Crear tarea
- Marcar completada
- Eliminar tarea
- Persistencia con localStorage
    `,
  },
  {
    id: 'node-server',
    title: 'Node.js & Express',
    description: 'Crea APIs y servidores backend con Node.js y Express.',
    category: 'Backend',
    level: 'INTERMEDIO',
    duration: 1020,
    students: 1550,
    content: `
# Node.js & Express

## 1. Setup Inicial
\`\`\`bash
npm init -y
npm install express
\`\`\`

## 2. Crear Servidor
\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'Hola desde Express' });
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
\`\`\`

## 3. Rutas y Métodos
- GET: Obtener datos
- POST: Crear datos
- PUT: Actualizar datos
- DELETE: Eliminar datos

## 4. Middleware
\`\`\`javascript
app.use((req, res, next) => {
  console.log('Request:', req.method, req.path);
  next();
});
\`\`\`

## 5. Base de Datos
- MongoDB
- PostgreSQL
- MySQL

## 6. Proyecto: API REST
- Crear CRUD de usuarios
- Validación
- Manejo de errores
    `,
  },
  {
    id: 'database-sql',
    title: 'SQL & Databases',
    description: 'Aprende SQL y gestión de bases de datos relacionales.',
    category: 'Backend',
    level: 'INTERMEDIO',
    duration: 780,
    students: 980,
    content: `
# SQL & Databases

## 1. Conceptos Básicos
- Tablas y registros
- Relaciones
- Llaves primarias y foráneas

## 2. Sentencias Básicas
\`\`\`sql
-- CREATE
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  email VARCHAR(100)
);

-- SELECT
SELECT * FROM usuarios WHERE edad > 18;

-- INSERT
INSERT INTO usuarios (nombre, email) 
VALUES ('Juan', 'juan@example.com');

-- UPDATE
UPDATE usuarios SET edad = 26 WHERE id = 1;

-- DELETE
DELETE FROM usuarios WHERE id = 1;
\`\`\`

## 3. Joins
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN

## 4. Aggregations
- COUNT, SUM, AVG
- GROUP BY
- HAVING

## 5. Proyecto: Sistema de Blog
- Tabla de usuarios
- Tabla de posts
- Tabla de comentarios
- Consultas complejas
    `,
  },
  {
    id: 'fullstack-app',
    title: 'Full Stack Application',
    description: 'Construye aplicaciones completas desde cero.',
    category: 'Full Stack',
    level: 'AVANZADO',
    duration: 1500,
    students: 750,
    content: `
# Full Stack Application

## 1. Arquitectura
- Frontend: React/Next.js
- Backend: Node.js/Express
- Database: PostgreSQL
- Auth: JWT

## 2. Setup del Proyecto
\`\`\`bash
npx create-next-app@latest my-app
npm install express
npm install prisma
\`\`\`

## 3. API Routes
\`\`\`javascript
export async function POST(req) {
  const data = await req.json();
  // Procesar datos
  return Response.json({ success: true });
}
\`\`\`

## 4. Autenticación
- Registro
- Login
- JWT tokens
- Refresh tokens

## 5. Deployment
- Vercel para frontend
- Railway/Render para backend
- Hosting de base de datos

## 6. Proyecto Final: SaaS
- Autenticación completa
- CRUD de recursos
- Pagos con Stripe
- Dashboard con analytics
    `,
  },
  {
    id: 'web-performance',
    title: 'Web Performance & Optimization',
    description: 'Optimiza tus aplicaciones web para máximo rendimiento.',
    category: 'Full Stack',
    level: 'AVANZADO',
    duration: 660,
    students: 520,
    content: `
# Web Performance & Optimization

## 1. Métricas Clave
- FCP: First Contentful Paint
- LCP: Largest Contentful Paint
- CLS: Cumulative Layout Shift
- TTFB: Time to First Byte

## 2. Optimización de Images
\`\`\`jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Descripción"
  width={800}
  height={600}
  loading="lazy"
/>
\`\`\`

## 3. Code Splitting
- Dynamic imports
- Route-based splitting
- Component lazy loading

## 4. Caching
- Browser cache
- CDN
- Server-side caching

## 5. Monitoreo
- Google Lighthouse
- Web Vitals
- Performance monitoring

## 6. Proyecto: Auditoría y Mejora
- Analizar sitio existente
- Identificar problemas
- Implementar soluciones
- Medir mejoras
    `,
  },
];

export default function CoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseWithProgress[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<CourseWithProgress | null>(null);
  const [filter, setFilter] = useState<'all' | 'BASICO' | 'INTERMEDIO' | 'AVANZADO' >(
    'all'
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [completingCourse, setCompletingCourse] = useState(false);
  const [viewingSlideshow, setViewingSlideshow] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      loadProgress();
    }
  }, [status, session]);

  const loadProgress = async () => {
    try {
      const response = await fetch('/api/courses/progress');
      const progress = await response.json();
      
      setCourses(prev =>
        prev.map(course => ({
          ...course,
          completed: progress.some(
            (p: any) => p.courseId === course.id && p.completed
          ),
          progress: progress.find((p: any) => p.courseId === course.id)?.progress || 0,
        }))
      );
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleCompleteCourse = async (courseId: string) => {
    if (status !== 'authenticated') {
      setShowLoginModal(true);
      return;
    }

    setCompletingCourse(true);
    try {
      const response = await fetch('/api/courses/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        const data = await response.json();
        loadProgress();
        // Mostrar notificación de éxito
        setCourses(prev =>
          prev.map(c =>
            c.id === courseId ? { ...c, completed: true, progress: 100 } : c
          )
        );
      }
    } catch (error) {
      console.error('Error completing course:', error);
    } finally {
      setCompletingCourse(false);
    }
  };

  const filteredCourses =
    filter === 'all' ? courses : courses.filter(c => c.level === filter);

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
            Cursos de Desarrollo
          </h1>
          <p className="text-xl text-gray-400">
            Aprende a construir aplicaciones web modernas
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {(['all', 'BASICO', 'INTERMEDIO', 'AVANZADO'] as const).map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === level
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {level === 'all' ? 'Todos' : level}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="card group cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedCourse(course)}
              >
                {/* Course Image */}
                <div
                  className={`h-40 rounded-lg mb-4 bg-gradient-to-br flex items-center justify-center ${
                    course.level === 'BASICO'
                      ? 'from-blue-600 to-blue-400'
                      : course.level === 'INTERMEDIO'
                      ? 'from-yellow-600 to-yellow-400'
                      : 'from-red-600 to-red-400'
                  }`}
                >
                  <BookOpen className="w-12 h-12 text-white/50" />
                </div>

                {/* Course Info */}
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {Math.floor(course.duration / 60)} minutos
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {course.students} estudiantes
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />4.8 (342 reseñas)
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      course.level === 'BASICO'
                        ? 'bg-blue-500/20 text-blue-300'
                        : course.level === 'INTERMEDIO'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {course.level}
                  </span>
                  {course.completed ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-semibold">Completado</span>
                    </div>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                      }}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="float-right text-2xl text-gray-400 hover:text-white mb-4"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
              <p className="text-gray-400 mb-6">{selectedCourse.description}</p>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Duración</p>
                  <p className="text-lg font-bold text-white">
                    {Math.floor(selectedCourse.duration / 60)} min
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Nivel</p>
                  <p className="text-lg font-bold text-white">{selectedCourse.level}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Recompensa XP</p>
                  <p className="text-lg font-bold text-purple-400">+100 XP</p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-6">
                <div className="max-h-64 overflow-y-auto pr-4">
                  {selectedCourse.content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h3 key={i} className="text-xl font-bold text-white mt-4 mb-2">
                          {line.replace('# ', '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('## ')) {
                      return (
                        <h4 key={i} className="text-lg font-semibold text-purple-300 mt-3 mb-1">
                          {line.replace('## ', '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={i} className="text-gray-300 ml-4">
                          {line.replace('- ', '')}
                        </li>
                      );
                    }
                    if (line.trim() !== '') {
                      return (
                        <p key={i} className="text-gray-300 mb-2">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:text-white transition-colors font-semibold"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => setViewingSlideshow(true)}
                  disabled={selectedCourse.completed || completingCourse}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedCourse.completed
                      ? 'bg-green-500/20 text-green-300 cursor-default'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {selectedCourse.completed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Completado
                    </>
                  ) : completingCourse ? (
                    'Guardando...'
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Completar Curso
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="card text-center max-w-md"
            >
              <LogIn className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Acceso Requerido</h2>
              <p className="text-gray-400 mb-6">
                Necesitas iniciar sesión para completar cursos
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <Link
                  href="/auth/login"
                  className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Course Slideshow */}
      <AnimatePresence>
        {viewingSlideshow && selectedCourse && (
          <CourseSlideshow
            courseTitle={selectedCourse.title}
            content={selectedCourse.content}
            onComplete={async () => {
              setViewingSlideshow(false);
              await handleCompleteCourse(selectedCourse.id);
              setSelectedCourse(null);
            }}
            onClose={() => {
              setViewingSlideshow(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
