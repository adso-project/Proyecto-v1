# PropertyHub 🏠

Sistema de gestión de propiedades turísticas desarrollado con React y Vite.

##  Descripción

PropertyHub es una aplicación web completa para la gestión de propiedades turísticas que permite a los usuarios:

- ✅ Registrar y autenticar usuarios
- ✅ Gestionar propiedades (Agregar, Editar, Eliminar)
- ✅ Administrar disponibilidad mediante calendario
- ✅ Configurar precios personalizados por fechas
- ✅ Panel de administración para usuarios admin
- ✅ Gestión de perfil y configuración

##  Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado en tu computadora:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **Git** - [Descargar aquí](https://git-scm.com/)

### Paso 1: Clonar el repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/adso-project/Proyecto-v1.git
cd Proyecto-v1
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias incluyendo React, React Router, y Vite.

### Paso 3: Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en la dirección:
```
http://localhost:5173
```

##  Uso de la Aplicación

### Primera vez:
1. Haz clic en "Crear Cuenta" para registrarte
2. El **primer usuario registrado** será automáticamente **administrador**
3. También puedes usar el usuario admin predefinido:
   - Email: `admin@property.com`
   - Contraseña: `admin123`

### Funcionalidades principales:
- **Dashboard**: Vista general con estadísticas
- **Propiedades**: Agregar y gestionar tus propiedades
- **Calendario**: Marcar fechas disponibles/no disponibles
- **Precios**: Establecer precios personalizados por rango de fechas
- **Perfil**: Actualizar tu información personal
- **Panel Admin**: (Solo para administradores) Ver todas las propiedades del sistema

##  Tecnologías Utilizadas

- **React 19.2.0** - Biblioteca de interfaz de usuario
- **Vite 7.2.7** - Build tool y dev server
- **React Router DOM** - Navegación entre páginas
- **Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos en el navegador

##  Estructura del Proyecto

```
my-app/
├── src/
│   ├── components/        # Componentes principales
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/           # Context API
│   │   ├── AuthContext.jsx
│   │   └── PropertyContext.jsx
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Overview.jsx
│   │   ├── Properties.jsx
│   │   ├── AddEditProperty.jsx
│   │   ├── Calendar.jsx
│   │   ├── Pricing.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── AdminPanel.jsx
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
├── public/                # Archivos estáticos
├── package.json           # Dependencias del proyecto
└── vite.config.js         # Configuración de Vite
```

##  Paleta de Colores

- **#FDFFFC** - Fondo principal (off-white)
- **#00635D** - Color primario (dark teal)
- **#08A4BD** - Color de acento (bright cyan)

##  Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 👥 Colaboradores

Este proyecto es desarrollado por el equipo ADSO Project.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
