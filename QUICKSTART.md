# 🚀 GUÍA RÁPIDA DE INICIO - KYROX

## Instalación (5 minutos)

### 1. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 2. Crear base de datos MySQL
\`\`\`bash
mysql -u root -p
\`\`\`

\`\`\`sql
CREATE DATABASE kyrox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

### 3. Configurar `.env.local`
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Actualiza en `.env.local`:
\`\`\`
DATABASE_URL=mysql://root:password@localhost:3306/kyrox_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_generado
\`\`\`

Genera el secreto:
\`\`\`bash
openssl rand -base64 32
\`\`\`

### 4. Inicializar Prisma
\`\`\`bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
\`\`\`

### 5. Ejecutar
\`\`\`bash
npm run dev
\`\`\`

Abre: http://localhost:3000

## 📋 Checklist Rápido

- [ ] MySQL running
- [ ] `.env.local` configurado
- [ ] Dependencias instaladas
- [ ] Prisma migrado
- [ ] Dev server ejecutándose

## 🔗 URLs Principales

- 🏠 Home: http://localhost:3000
- 📚 Cursos: http://localhost:3000/courses
- 🎮 Práctica: http://localhost:3000/practice
- 👤 Dashboard: http://localhost:3000/dashboard
- 👥 Comunidad: http://localhost:3000/community
- 📖 Blog: http://localhost:3000/blog
- 📞 Contacto: http://localhost:3000/contact

## 👤 Usuario de Prueba

Después del seed, puedes crear un usuario en `/auth/register` o usar credenciales de prueba si están disponibles.

## ⚡ Troubleshooting

### Port 3000 ya está en uso
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Error de conexión a MySQL
- Verifica que MySQL está ejecutándose
- Confirma DATABASE_URL en `.env.local`
- Asegúrate de que la base de datos existe

### Error en Prisma
\`\`\`bash
npm run prisma:generate
npm run prisma:migrate force
\`\`\`

## 🎯 Próximos Pasos

1. Explorar `/src` para entender la estructura
2. Leer la [documentación completa](README.md)
3. Completar primeros cursos
4. Crear tu primer proyecto
5. ¡Únete a la comunidad!

---

¿Necesitas ayuda? Revisa README.md o contacta hola@kyrox.com
