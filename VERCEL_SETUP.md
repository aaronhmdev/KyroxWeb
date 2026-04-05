# Configuración en Vercel

## Variables de Entorno Requeridas

Para deployar en Vercel, debes configurar estas variables en el dashboard de tu proyecto:

### 1. **NEXTAUTH_SECRET** (REQUERIDA)
Una clave secreta para NextAuth. Genera una con:
```bash
openssl rand -base64 32
```
O usa un generador online: https://generate-secret.vercel.app/32

**Ejemplo:**
```
abc123def456ghi789jkl012mno345pqr
```

### 2. **NEXTAUTH_URL** (REQUERIDA)
La URL de tu aplicación en Vercel:
```
https://tu-dominio.vercel.app
```

### 3. **DATABASE_URL** (REQUERIDA para producción)
SQLite no funciona en Vercel (el sistema de archivos es efímero). Opciones:

**Opción A: MySQL (Recomendado)**
```
mysql://usuario:contraseña@host.mysql.database.azure.com:3306/kyrox
```

**Opción B: PostgreSQL**
```
postgresql://usuario:contraseña@host.postgres.database.azure.com:5432/kyrox
```

**Opción C: PlanetScale (MySQL compatible)**
```
mysql://root:pscale_pw_xxxxx@xxxxx.mysql.psscale.com/kyrox?sslaccept=strict
```

## Pasos para Configurar en Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto **KyroxWeb**
3. Haz clic en **Settings** → **Environment Variables**
4. Añade cada variable:
   - **NEXTAUTH_SECRET**: `tu-clave-generada`
   - **NEXTAUTH_URL**: `https://kyrox-web.vercel.app` (o tu dominio)
   - **DATABASE_URL**: Tu conexión MySQL/PostgreSQL

5. Haz clic en **Deploy** para redeployer con las nuevas variables

## Generador de NEXTAUTH_SECRET

Para generar una clave segura:

**En Windows PowerShell:**
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**En Linux/Mac:**
```bash
openssl rand -base64 32
```

## Base de Datos Recomendadas

### Opción 1: PlanetScale (Gratis)
- Crea cuenta en https://planetscale.com
- Crea una rama "main"
- Copia la connection string de "MySQL" en la rama
- **Ventaja**: Gratis, scale automático, muy rápido

### Opción 2: Azure MySQL
- Crea una instancia en https://azure.microsoft.com
- Copia la connection string
- **Ventaja**: Integración con Azure, escalable

### Opción 3: MongoDB + Prisma
Si prefieres NoSQL:
```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/kyrox
```

## Después de Configurar

1. El build debería ser exitoso
2. Verifica en los logs de Vercel que no haya errores de variables de entorno
3. Prueba acceder a `https://tu-dominio.vercel.app`

## Troubleshooting

**Error: "Failed to collect page data for /api/auth/[...nextauth]"**
- Asegúrate que `NEXTAUTH_SECRET` está configurada
- Asegúrate que `NEXTAUTH_URL` es correcta

**Error: "Unable to open the database file"**
- Cambia a una base de datos real (MySQL/PostgreSQL)
- SQLite no soporta Vercel

**Error de conexión a BD**
- Verifica que la `DATABASE_URL` es correcta
- Asegúrate que tu BD permite conexiones desde Vercel
