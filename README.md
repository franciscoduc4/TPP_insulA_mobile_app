<div align="center">
  <img src="assets\logo-fiuba.png" alt="Logo FIUBA" width="800"/>
</div>

# insulA - Aplicación de Gestión de insulina


insulA es una aplicación integral para la gestión de la diabetes diseñada para ayudar a los usuarios a realizar seguimiento, monitorear y gestionar su diabetes de manera efectiva. La aplicación proporciona una interfaz intuitiva para registrar niveles de glucosa, dosis de insulA y otras métricas importantes de salud, mientras ofrece análisis de tendencias y estadísticas.

## Características

### Características Actuales
- 📊 Panel de control con métricas clave de salud
- 📝 Registro y seguimiento de niveles de glucosa
- 💉 Registro de dosis de insulina
- 📈 Análisis y visualización de tendencias
- 📅 Vista de historial de datos
- ⚙️ Configuraciones personalizables
- 📱 Diseño orientado a dispositivos móviles con soporte para notch y dynamic island
- 🌓 Soporte para modo claro/oscuro

### Características Planificadas
- 🔔 Recordatorios y notificaciones
- 📊 Análisis y reportes avanzados
- 🤝 Integración con profesionales de la salud
- 📱 Funcionalidad de exportación de datos
- 🔄 Sincronización de datos entre dispositivos
- 👥 Acceso para familiares/cuidadores
- 🍎 Seguimiento de alimentos y carbohidratos
- 💪 Registro de ejercicios y análisis de impacto

## Stack Tecnológico

- **Framework Frontend**: React Native
- **Componentes UI**: Tailwind CSS 
- **Lenguajes**: TypeScript/Javascript
- **Iconos**: Lucide Icons
- **Fuentes**: Inter (Google Fonts)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:
- Node.js (v18.17 o superior)
- npm (v9.0 o superior)
- Git

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/yourusername/TPP_insulA_mobile_app.git
   cd TPP_insulA_app
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env.local` en el directorio raíz y agregar las variables de entorno necesarias:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

## Ejecutar la Aplicación

### Modo Desarrollo
Para ejecutar la aplicación en modo desarrollo:
```bash
npm expo start
```
La aplicación estará disponible en `http://localhost:3000`

### Build de Producción
Para crear y ejecutar una build de producción:
```bash
npm run build
npm start
```

## Estructura del Proyecto

```
TPP_insulA_app/
├── app/                    # Directorio de Next.js
│   ├── components/        # Componentes compartidos
│   ├── lib/              # Funciones de utilidad y hooks
│   ├── pages/            # Páginas de la aplicación
│   └── styles/           # Estilos globales
├── public/               # Archivos estáticos
└── components/           # Componentes UI reutilizables
```

## Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/NuevaCaracteristica`)
3. Realiza tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Sube la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Soporte

Para soporte, por favor abre un issue en el repositorio de GitHub o contacta al equipo de desarrollo.

