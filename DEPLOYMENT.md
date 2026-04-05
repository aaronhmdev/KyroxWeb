# GUÍA DE DEPLOYMENT - KYROX

## 🌐 Deployment en Vercel

Kyrox está optimizado para Vercel. Aquí está la guía paso a paso.

### Requisitos
- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub
- Base de datos MySQL en la nube (PlanetScale, AWS RDS, etc.)

### Paso 1: Preparar la Base de Datos en la Nube

#### Opción A: PlanetScale (Recomendado)

1. Crea cuenta en [PlanetScale](https://planetscale.com)
2. Crea una base de datos llamada `kyrox`
3. Conecta desde tu local primero:
   ```bash
   pscale connect kyrox main --port 3306
   ```
4. Obtén el string de conexión desde el dashboard
5. Guarda en `.env.local` para probar

#### Opción B: AWS RDS

1. Crea instancia MySQL en RDS
2. Configura security groups para permitir conexiones
3. Obtén el endpoint
4. Crea un `.env.local` con:
   ```
   DATABASE_URL=mysql://user:password@endpoint:3306/kyrox_db
   ```

### Paso 2: Preparar el Repositorio

```bash
# Ensure everything is committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Paso 3: Conectar a Vercel

1. Ve a [https://vercel.com/import](https://vercel.com/import)
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio de Kyrox
4. Click en "Import"

### Paso 4: Configurar Variables de Entorno

En Vercel dashboard → Project Settings → Environment Variables

Añade cada variable:

**Producción (Deployment)**
- `DATABASE_URL`: Tu MySQL en la nube
- `NEXTAUTH_URL`: https://tu-dominio.vercel.app
- `NEXTAUTH_SECRET`: `openssl rand -base64 32`

**Preview y Development**
- Iguales a Producción (o diferentes si prefieres)

Ejemplo:
```
DATABASE_URL: mysql://user:pass@aws-endpoint.mysql.rds.amazonaws.com:3306/kyrox
NEXTAUTH_URL: https://kyrox-app.vercel.app
NEXTAUTH_SECRET: [32-char-random-string]
```

### Paso 5: Deploy Automático

Una vez configurado:

1. Vercel deployará automáticamente en cada push a `main`
2. Los deploys preview se crean para PRs
3. Monitorea los deploys en el dashboard

### Paso 6: Ejecutar Migraciones en Producción

Después del primer deploy, necesitas correr migrations:

```bash
# Localmente (con DATABASE_URL de producción)
npm run prisma:migrate -- --skip-generate
npm run prisma:seed
```

O usa el script de Vercel:

```bash
vercel env pull .env.local
npm run prisma:migrate
npm run prisma:seed
```

## 🔄 CI/CD Pipeline

Vercel automáticamente:
- ✅ Corre build en cada push
- ✅ Ejecuta tests (si están configurados)
- ✅ Deploya a production si todo pasa
- ✅ Crea preview URLs para PRs

## 🔒 Seguridad en Producción

### Checklist de Seguridad

- [ ] `NEXTAUTH_SECRET` es único y fuerte
- [ ] `DATABASE_URL` no está en el código fuente
- [ ] Variables de entorno configuradas en Vercel
- [ ] URL de base de datos usa HTTPS/SSL
- [ ] Firewall de BD restricts conexiones
- [ ] Backups automáticos de BD configurados
- [ ] Rate limiting activado en API routes
- [ ] CORS configurado correctamente

### Configurar Rate Limiting

Vercel proporciona rate limiting automático. Para custom limiting, usa middleware:

```typescript
// src/middleware.ts
import { Ratelimit } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request) {
  const { success } = await ratelimit.limit(request.ip || '127.0.0.1');
  if (!success) {
    return new Response('Rate limited', { status: 429 });
  }
  return NextResponse.next();
}
```

## 📊 Monitoreo

### Analytics de Vercel

1. Dashboard → Analytics
2. Monitorea:
   - Core Web Vitals
   - Response times
   - Error rates
   - Traffic

### Errores y Logs

1. Function Logs → Ver logs del servidor
2. Error Tracking → Monitorea crashes

## 🆘 Troubleshooting

### Build Fallando

```bash
# Verifica el build localmente
npm run build

# Limpia caché
rm -rf .next
npm run build
```

### Errores de Migraciones

```bash
# Reset de BD (cuidado!)
npm run prisma:migrate reset

# O manualmente
# 1. Elimina todas las tablas en la BD
# 2. Corre migraciones de nuevo
npm run prisma:migrate deploy
```

### Conexión a BD Rechazada

- Verifica IP whitelist de la BD
- Revisa credentials en `.env.local`
- Prueba conexión local primero
- Revisa logs de Vercel

### NextAuth Errors

- Asegúrate que `NEXTAUTH_URL` es exacta
- `NEXTAUTH_SECRET` debe ser igual en todos lados
- Revisa cookies habilitadas en navegador

## 🔄 Actualizar a Producción

### Buenas Prácticas

```bash
# 1. Crear rama para feature
git checkout -b feature/nuevo-curso

# 2. Hacer cambios y commits
git add .
git commit -m "Add new course"

# 3. Push y crear PR
git push origin feature/nuevo-curso

# 4. Vercel crea preview deployment automáticamente
# 5. Revisa en preview antes de merge
# 6. Merge a main when ready
git checkout main
git merge feature/nuevo-curso

# 7. Vercel deploya a production automáticamente
```

### Rollback si Hay Problema

En Vercel dashboard:
1. Deployments → Encuentra el deployment previo
2. Click en menú (...)
3. "Promote to Production"

## 📈 Escalabilidad

### Cuando Kyrox Crece

- **BD**: Upgrade plan PlanetScale o AWS RDS
- **Almacenamiento**: Usa Vercel Blob para archivos
- **Cache**: Implementa Redis desde Vercel KV
- **CDN**: Vercel maneja CDN automáticamente

### Usar Vercel KV para Cache

```typescript
import { kv } from '@vercel/kv';

// Guardar cache
await kv.set('courses', JSON.stringify(courses), { ex: 3600 });

// Obtener cache
const cached = await kv.get('courses');
```

## 🎯 Dominio Personalizado

1. Compra dominio en Namecheap, GoDaddy, etc.
2. Vercel → Project Settings → Domains
3. Añade tu dominio
4. Actualiza DNS records
5. Vercel generará SSL automáticamente

## 📞 Soporte

- Documentación Vercel: https://vercel.com/docs
- Deploy Issues: https://vercel.com/help
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org

---

¡Tu Kyrox ahora está en producción! 🚀
