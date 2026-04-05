# 📦 KYROX - DOCUMENTACIÓN COMPLETA

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación Rápida](#instalación-rápida)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración Avanzada](#configuración-avanzada)
5. [Features Detalladas](#features-detalladas)
6. [API Documentation](#api-documentation)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Introducción

Kyrox es una plataforma educativa completa (SaaS) para aprender desarrollo web con:

- **Autenticación segura** con NextAuth
- **Sistema de gamificación** (niveles, XP, logros)
- **Cursos interactivos** con progreso
- **Comunidad** de desarrolladores
- **Blog** y recursos
- **Responsive design** con Tailwind CSS
- **Animaciones** con Framer Motion
- **Base de datos** con Prisma + MySQL

### Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Frontend | React 18, Next.js 14, Tailwind CSS 3 |
| Backend | Node.js, API Routes |
| Database | MySQL 8, Prisma ORM |
| Auth | NextAuth.js v4 |
| Animations | Framer Motion |
| Deploy | Vercel |

---

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 18+
- MySQL 8.0+
- Git

### Pasos (5 minutos)

```bash
# 1. Clonar
git clone <repo-url>
cd kyrox

# 2. Instalar dependencias
npm install

# 3. Configurar BD MySQL
mysql -u root -p
CREATE DATABASE kyrox_db CHARACTER SET utf8mb4;
EXIT;

# 4. Variables de entorno
cp .env.local.example .env.local
# Edita .env.local con tus credenciales

# 5. Prisma setup
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 6. Ejecutar
npm run dev
```

**URL**: http://localhost:3000

### Primeros Pasos
1. Registra un usuario en `/auth/register`
2. Accede al dashboard `/dashboard`
3. Explora cursos en `/courses`
4. Prueba la práctica en `/practice`

---

## 📂 Estructura del Proyecto

```
kyrox/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes (Backend)
│   │   │   ├── auth/
│   │   │   │   ├── [...]nextauth]/   # NextAuth handler
│   │   │   │   └── register/         # Registro
│   │   │   ├── courses/
│   │   │   │   ├── list/             # GET cursos
│   │   │   │   ├── complete/         # POST completar
│   │   │   │   └── progress/         # GET progreso usuario
│   │   │   ├── projects/             # CRUD proyectos
│   │   │   ├── leaderboard/          # GET ranking
│   │   │   ├── user/
│   │   │   │   └── profile/          # GET/PUT perfil
│   │   │   └── contact/              # POST mensajes
│   │   │
│   │   ├── auth/                     # Páginas de autenticación
│   │   │   ├── login/                # Login page
│   │   │   └── register/             # Registro page
│   │   │
│   │   ├── dashboard/                # Dashboard usuario
│   │   ├── courses/                  # Página de cursos
│   │   ├── practice/                 # Zona de práctica
│   │   ├── projects/                 # Gestión de proyectos
│   │   ├── community/                # Comunidad
│   │   ├── blog/                     # Blog
│   │   ├── resources/                # Recursos
│   │   ├── contact/                  # Formulario contacto
│   │   ├── roadmap/                  # Ruta de desarrollador
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Estilos globales
│   │
│   ├── components/
│   │   ├── navbar/                   # Componente navbar
│   │   ├── ui/                       # Componentes reutilizables
│   │   └── providers.tsx             # Session provider
│   │
│   ├── lib/
│   │   ├── prisma.ts                 # Cliente Prisma
│   │   ├── gamification.ts           # Lógica XP/niveles
│   │   └── auth.ts                   # Utilidades auth
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript types
│   │
│   └── middleware.ts                 # Protección de rutas
│
├── prisma/
│   ├── schema.prisma                 # Esquema BD
│   └── seed.js                       # Datos iniciales
│
├── public/                           # Assets estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.local.example
├── README.md                         # Docs
├── QUICKSTART.md                     # Inicio rápido
├── DEPLOYMENT.md                     # Deployment
└── ARCHITECTURE.md                   # Arquitectura
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
# Database
DATABASE_URL=mysql://user:pass@localhost:3306/kyrox_db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generado_con_openssl_rand

# OAuth (Opcional)
GITHUB_ID=xxxxx
GITHUB_SECRET=xxxxx
DISCORD_ID=xxxxx
DISCORD_SECRET=xxxxx

# Email (Futuro)
SMTP_HOST=smtp.gmail.com
SMTP_USER=tu@email.com
SMTP_PASS=xxxx
```

### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Personalizar Tema

Edita `tailwind.config.ts`:

```typescript
colors: {
  kyrox: {
    dark: '#0f0f1e',      // Fondo principal
    darker: '#0a0a14',    // Fondo secundario
    accent: '#9664ff',    // Color primario
    success: '#10b981',   // Verde
    warning: '#f59e0b',   // Naranja
    danger: '#ef4444',    // Rojo
  },
}
```

### Cambiar Nombre de la App

1. `components/navbar/Navbar.tsx` - Logo
2. `app/layout.tsx` - Metadata title
3. `package.json` - Name field
4. Busca "Kyrox" en el código

---

## 🎮 Features Detalladas

### 1. Sistema de Autenticación

#### Registro
```typescript
// POST /api/auth/register
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "securepassword",
  "confirmPassword": "securepassword"
}
```

#### Login
```typescript
// Usa NextAuth signIn()
await signIn('credentials', {
  email: 'juan@example.com',
  password: 'securepassword'
});
```

### 2. Sistema de Gamificación

#### Modelos de Datos

```prisma
model User {
  level: Int          // 1-100+
  xp: Int            // Experiencia actual
  nextLevelXp: Int   // XP requerido para siguiente nivel
  streak: Streak?    // Racha de actividad
}

model Achievement {
  title: String
  criteria: String   // "complete_first_course", etc
}

model Streak {
  currentStreak: Int
  longestStreak: Int
  lastActivityAt: DateTime
}
```

#### Recompensas de XP

| Acción | XP |
|--------|-----|
| Completar curso | +100 |
| Completar reto | +50 |
| Subir proyecto | +150 |

#### Escalado de Niveles

```
Nivel 1   → 0 XP
Nivel 2   → 100 XP
Nivel 3   → 150 XP (100 * 1.5)
Nivel 4   → 225 XP (150 * 1.5)
...
```

### 3. Cursos

Modalidad de cursos:

```prisma
model Course {
  title: String
  description: String
  level: 'BASICO' | 'INTERMEDIO' | 'AVANZADO'
  content: String        // HTML rich text
  videoUrl: String?      // YouTube embed
  pdfUrl: String?        // PDF descargable
}

model Progress {
  userId: String
  courseId: String
  completed: Boolean     // true cuando user lo termina
  progress: Int          // 0-100
  completedAt: DateTime?
}
```

### 4. Proyectos

```prisma
model Project {
  title: String
  description: String
  imageUrl: String?       // Screenshot
  demoUrl: String?        // Link a demo
  githubUrl: String?      // Repo GitHub
  userId: String
  createdAt: DateTime
}
```

### 5. Logros

```prisma
model Achievement {
  criteria: String
  // Ejemplos:
  // "complete_first_course"
  // "upload_first_project"
  // "reach_level_5"
}
```

---

## 🔌 API Documentation

### Endpoints Públicos

#### GET /api/courses/list
Obtiene lista de todos los cursos

```bash
curl http://localhost:3000/api/courses/list
```

**Response:**
```json
[
  {
    "id": "123",
    "title": "HTML Básico",
    "level": "BASICO",
    "category": "Frontend"
  }
]
```

#### GET /api/leaderboard
Obtiene top 50 usuarios por XP

```bash
curl http://localhost:3000/api/leaderboard
```

### Endpoints Protegidos (Requieren autenticación)

#### GET /api/user/profile
Obtiene perfil del usuario autenticado

```bash
curl -H "Authorization: Bearer token" http://localhost:3000/api/user/profile
```

#### POST /api/courses/complete
Marca un curso como completado

```bash
curl -X POST http://localhost:3000/api/courses/complete \
  -H "Content-Type: application/json" \
  -d '{"courseId": "123"}'
```

#### GET /api/courses/progress
Obtiene progreso del usuario en cursos

```bash
curl http://localhost:3000/api/courses/progress
```

#### POST /api/projects
Crea un nuevo proyecto

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi App",
    "description": "Una app awesome",
    "demoUrl": "https://...",
    "githubUrl": "https://github.com/..."
  }'
```

---

## 🚀 Deployment

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guía completa.

### Quick Deploy

```bash
# 1. Asegúrate que todo está en git
git add .
git commit -m "Ready for deploy"
git push origin main

# 2. Abre Vercel y conecta tu repo
# 3. Configura variables de entorno
# 4. Deploy automático

# 5. Configura BD MySQL en la nube
# 6. Corre migraciones en producción
vercel env pull .env.local
npm run prisma:migrate
```

---

## 🐞 Troubleshooting

### Error: ECONNREFUSED MySQL

**Problema**: No puede conectar a MySQL

**Soluciones**:
```bash
# 1. Verifica que MySQL está corriendo
sudo service mysql status

# 2. Revisa DATABASE_URL en .env.local
# Debe ser: mysql://user:password@localhost:3306/kyrox_db

# 3. Crea la BD si no existe
mysql -u root -p
CREATE DATABASE kyrox_db;
```

### Error: Prisma migration issues

```bash
# Regenera cliente
npm run prisma:generate

# Reset (CUIDADO - borra datos)
npm run prisma:migrate reset

# O manualmente
npx prisma migrate dev --name init
```

### Error: NextAuth token invalid

```bash
# Regenera NEXTAUTH_SECRET
openssl rand -base64 32

# Actualiza en .env.local y redeploy
```

### Error: Build failing in Vercel

```bash
# Prueba build localmente
npm run build

# Limpia caché
rm -rf .next node_modules
npm install
npm run build
```

### Error: Tailwind CSS no se aplica

```bash
# Asegúrate de que postcss está corriendo
# Reinicia dev server
Ctrl+C
npm run dev
```

---

## 🔐 Seguridad

### Buenas Prácticas

1. **Never commit .env.local**
   - Está en .gitignore
   - Variables en Vercel dashboard

2. **Contraseñas** (bcryptjs)
   - Hasheadas antes de guardar
   - Comparación segura en login

3. **Sesiones JWT**
   - Encriptadas con NEXTAUTH_SECRET
   - MaxAge: 30 días
   - HttpOnly cookies

4. **Rutas Protegidas**
   - Middleware valida token
   - Redirect a login si no autenticado

### CORS y CSP

Configurado en `next.config.js`:
- Solo acepta requests del mismo dominio
- Headers de seguridad automáticos

---

## 📚 Recursos Adicionales

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion Docs**: https://www.framer.com/motion

---

## 🆘 Support

- **Issues**: Abre un issue en GitHub
- **Email**: hola@kyrox.com
- **Discord**: [Tu servidor Discord]

---

**Kyrox** - Construyendo el futuro de la educación en desarrollo web 💜

Última actualización: 2024
