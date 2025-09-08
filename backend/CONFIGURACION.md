# 📧 Configuración del Sistema de Email

## 🚀 Pasos para Configurar el Envío de Emails

### 1. Crear archivo .env
Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# Configuración del servidor
PORT=3001

# Configuración de email - REEMPLAZA CON TUS DATOS
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=djsebamaza@gmail.com
EMAIL_PASS=tu-password-de-aplicacion
EMAIL_TO=djsebamaza@gmail.com

# Configuración de CORS
FRONTEND_URL=http://localhost:5173
```

### 2. Configurar Gmail (Recomendado)

#### Opción A: Usar Gmail con contraseña de aplicación
1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Mail"
5. Usa esa contraseña en `EMAIL_PASS`

#### Opción B: Usar otro proveedor SMTP
- **Outlook/Hotmail**: `smtp-mail.outlook.com`, puerto 587
- **Yahoo**: `smtp.mail.yahoo.com`, puerto 587
- **Otros**: Consulta la documentación de tu proveedor

### 3. Iniciar el Backend
```bash
cd backend
npm start
```

### 4. Iniciar el Frontend
```bash
npm run dev
```

## 🧪 Probar la Funcionalidad

1. Completa cualquier flujo de evento (XV Años, Bodas, Cumpleaños, Corporativos)
2. En el paso final, verás el botón "📧 Enviar Resumen por Email"
3. Haz clic en el botón
4. Verifica que recibas el email con toda la información

## 🔧 Solución de Problemas

### Error de conexión
- Verifica que el backend esté ejecutándose en puerto 3001
- Revisa la configuración de CORS

### Error de autenticación de email
- Verifica las credenciales en el archivo .env
- Asegúrate de usar contraseña de aplicación, no tu contraseña normal

### Email no llega
- Revisa la carpeta de spam
- Verifica que `EMAIL_TO` sea correcto

## 📝 Notas Importantes

- El archivo `.env` NO debe subirse a Git (ya está en .gitignore)
- Para producción, usa variables de entorno del servidor
- El sistema está diseñado para ser escalable y agregar más emails/salones después
