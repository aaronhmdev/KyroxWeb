# Kyrox - Plataforma Educativa SaaS

Una plataforma completa de educación en desarrollo web con sistema de gamificación, cursos interactivos, comunidad y más.

## 🚀 Características Principales

- **Autenticación Segura**: NextAuth.js con contraseñas encriptadas
- **Sistema de Gamificación**: Niveles, XP, logros y streaks
- **Cursos Interactivos**: HTML, CSS, JavaScript, Git, Backend y más
- **Zona de Práctica**: Retos codificados con recompensas
- **Gestión de Proyectos**: CRUD completo con demostraciones
- **Comunidad**: Perfiles de usuario y conexión con Discord/WhatsApp
- **Blog**: Sistema de artículos y tutoriales
- **Leaderboard**: Rankings dinámicos de usuarios
- **Responsivo**: Diseño mobile-first con Tailwind CSS
- **Animaciones**: Transiciones suaves con Framer Motion

## 📋 Stack Tecnológico

### Frontend
- **Next.js 14** - React framework con App Router
- **React 18** - Componentes UI
- **Tailwind CSS 3** - Estilos y diseño
- **Framer Motion** - Animaciones
- **Heroicons** - Iconografía
- **next-auth** - Autenticación

### Backend
- **Node.js** - Runtime
- **API Routes** - Endpoints serverless
- **Prisma ORM** - Database management
- **MySQL** - Base de datos

### Deployment
- **Vercel** - Hosting optimizado

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- npm o yarn
- MySQL 8.0+
- Git

### Paso 1: Clonar el Repositorio

\`\`\`bash
git clone <tu-repo-url>
cd kyrox
\`\`\`

### Paso 2: Instalar Dependencias

\`\`\`bash
npm install
# o
yarn install
\`\`\`

### Paso 3: Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edita `.env.local` con:

\`\`\`env
# Database
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/kyrox_db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_seguro_aqui

# OAuth (opcional)
GITHUB_ID=tu_github_id
GITHUB_SECRET=tu_github_secret
DISCORD_ID=tu_discord_id
DISCORD_SECRET=tu_discord_secret
\`\`\`

### Paso 4: Generar Secreto para NextAuth

\`\`\`bash
openssl rand -base64 32
\`\`\`

Copia el resultado y pégalo en `NEXTAUTH_SECRET` del archivo `.env.local`.

### Paso 5: Crear la Base de Datos (MySQL)

\`\`\`bash
# En tu cliente MySQL o terminal
mysql -u root -p
\`\`\`

\`\`\`sql
CREATE DATABASE kyrox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
\`\`\`

### Paso 6: Configurar Prisma

\`\`\`bash
# Genera el cliente de Prisma
npm run prisma:generate

# Corre las migraciones
npm run prisma:migrate

# Opcional: Siembra la base de datos con datos ejemplo
npm run prisma:seed
\`\`\`

### Paso 7: Ejecutar el Servidor de Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

\`\`\`
kyrox/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes
│   │   │   ├── auth/              # Autenticación
│   │   │   ├── courses/           # Cursos API
│   │   │   ├── projects/          # Proyectos API
│   │   │   ├── user/              # Usuario API
│   │   │   └── contact/           # Contacto API
│   │   ├── auth/                  # Páginas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/             # Dashboard del usuario
│   │   ├── courses/               # Lista de cursos
│   │   ├── practice/              # Zona de práctica
│   │   ├── projects/              # Gestión de proyectos
│   │   ├── community/             # Comunidad
│   │   ├── blog/                  # Blog
│   │   ├── resources/             # Recursos
│   │   ├── contact/               # Formulario de contacto
│   │   ├── roadmap/               # Ruta de desarrollo
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Landing page
│   │   └── globals.css            # Estilos globales
│   ├── components/
│   │   ├── navbar/                # Component de navegación
│   │   ├── ui/                    # Componentes reutilizables
│   │   └── providers.tsx          # Providers
│   ├── lib/
│   │   ├── prisma.ts             # Cliente Prisma
│   │   ├── gamification.ts        # Lógica de gamificación
│   │   └── auth.ts                # Utilidades de auth
│   ├── types/
│   │   └── index.ts               # Type definitions
│   └── middleware.ts              # Next.js middleware
├── prisma/
│   ├── schema.prisma              # Esquema de BD
│   └── seed.js                    # Script de seeding
├── public/                        # Archivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
\`\`\`

## 🔐 Autenticación

### Registro
1. Navega a `/auth/register`
2. Completa el formulario con nombre, email y contraseña
3. Se crea automáticamente una cuenta con nivel 1

### Login
1. Ve a `/auth/login`
2. Ingresa tus credenciales
3. Se inicia la sesión con NextAuth

### Rutas Protegidas
Las siguientes rutas requieren autenticación:
- `/dashboard` - Tu panel de control
- `/profile` - Tu perfil

## 🎮 Sistema de Gamificación

### Niveles y XP
- Inicio: **Nivel 1** con 0 XP
- Completar curso: **+100 XP**
- Completar reto: **+50 XP**
- Subir proyecto: **+150 XP**
- Subida automática de nivel cuando alcanzas el XP requerido

### Logros
Desbloquea logros completando objetivos:
- 🎓 Primer curso completado
- 🚀 Primer proyecto subido
- ⭐ Nivel 5 alcanzado
- Y más...

### Streaks (Rachas)
Mantén tu racha de actividad diaria para bonificaciones especiales.

## 📚 Funcionalidades

### Cursos
- HTML Básico
- CSS Intermedio
- JavaScript Avanzado
- Git
- Backend
- Y más...

Cada curso incluye:
- Contenido en texto
- Videos embebidos
- PDFs descargables
- Progreso guardado

### Práctica
Completa retos con dificultad escalada:
- Formulario (Básico)
- Login UI (Intermedio)
- Clon Netflix (Avanzado)

### Proyectos
- Crear proyectos con descripción
- Enlace a demo y GitHub
- Visualizar proyectos de otros usuarios
- Mostrar en perfil

### Comunidad
- Ver perfiles de otros usuarios
- Conectar con Discord
- Conectar con WhatsApp
- Leaderboard de usuarios

### Blog
- Artículos sobre desarrollo
- Tutoriales paso a paso
- Tips y tricks

## 🚀 Deployment en Vercel

### Paso 1: Preparar Repositorio

\`\`\`bash
git add .
git commit -m "Kyrox ready for deployment"
git push origin main
\`\`\`

### Paso 2: Conectar Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Selecciona tu repositorio
4. Click en "Import Project"

### Paso 3: Configurar Variables de Entorno

En Vercel dashboard, añade las variables del `.env.local`:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- (Opcionalmente) `GITHUB_ID` y `GITHUB_SECRET`

### Paso 4: Deploy

Vercel deployará automáticamente al hacer push a main.

## 📖 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint

# Prisma
npm run prisma:generate    # Generar cliente Prisma
npm run prisma:migrate     # Correr migraciones
npm run prisma:studio      # Abrir Prisma Studio
npm run prisma:seed        # Seed inicial de datos
\`\`\`

## 🔧 Configuración Avanzada

### Personalizar Tema

Edita `tailwind.config.ts` para cambiar colores:

\`\`\`typescript
colors: {
  kyrox: {
    dark: '#0f0f1e',
    darker: '#0a0a14',
    accent: '#9664ff',
  },
  // ...
}
\`\`\`

### Agregar OAuth

Para agregar GitHub o Discord OAuth:

1. Crea la app en GitHub/Discord Developer Console
2. Añade las credenciales al `.env.local`
3. Actualiza `src/app/api/auth/[...nextauth]/route.ts`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

¿Problemas? Contacta:
- **Email**: hola@kyrox.com
- **Discord**: [Tu servidor]
- **GitHub Issues**: [Issues del proyecto]

## 🎯 Roadmap Futuro

- [ ] Certificados digitales
- [ ] Sistema de mentores
- [ ] Marketplace de proyectos
- [ ] Integraciones con plataformas externas
- [ ] Mobile app con React Native
- [ ] Videoconferencias integradas
- [ ] Simulador de entrevistas técnicas

---

**Kyrox** - Para desarrolladores que quieren crecer.

Hecho con 💜 por la comunidad de Kyrox.
