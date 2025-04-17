const path = require('path');
const fs = require('fs');

// Paths de archivos de mock
const SKIA_MOCK_PATH = path.resolve(__dirname, 'skia-mock.js');

// Función segura para convertir rutas de Windows a POSIX
const toPosixPathSafe = inputPath => {
  if (!inputPath || typeof inputPath !== 'string') {
    return './';
  }
  // Manejar correctamente las rutas con espacios
  return inputPath.replace(/\\/g, '/');
};

// Mapa de módulos conocidos para fallback si la resolución falla
const knownModules = {
  'expo': path.join(__dirname, 'node_modules', 'expo', 'index.js'),
  'react': path.join(__dirname, 'node_modules', 'react', 'index.js'),
  'react-native': path.join(__dirname, 'node_modules', 'react-native', 'index.js'),
  '@babel/runtime/helpers/interopRequireDefault': path.join(__dirname, 'node_modules', '@babel/runtime', 'helpers', 'interopRequireDefault.js'),
  'metro-runtime/src/modules/asyncRequire': path.join(__dirname, 'node_modules', 'metro-runtime', 'src', 'modules', 'asyncRequire.js'),
  './App': path.join(__dirname, 'App.tsx'),
  './index': path.join(__dirname, 'index.js'),
};

// Función auxiliar para manejar la resolución de rutas con espacios
const normalizePath = (pathWithPossibleSpaces) => {
  if (!pathWithPossibleSpaces) return '';
  return pathWithPossibleSpaces.replace(/(\s+)/g, '\\$1');
};

/**
 * Resolvedor personalizado para Metro que intercepta las importaciones de módulos problemáticos
 * y los redirige a nuestros mocks
 */
function resolveRequest(context, moduleName, platform) {
  // Detectar importaciones de @shopify/react-native-skia
  if (moduleName === '@shopify/react-native-skia' || 
      moduleName.startsWith('@shopify/react-native-skia/')) {
    return {
      filePath: SKIA_MOCK_PATH,
      type: 'sourceFile',
    };
  }

  // Para todos los demás módulos, dejar que Metro use su resolución predeterminada
  return null;
}

// Verificar que los archivos de mock existan
function verifyMocks() {
  // Verificar que los archivos de mock existen
  const mockExists = {
    skia: fs.existsSync(SKIA_MOCK_PATH)
  };
  
  if (!mockExists.skia) {
    console.warn('⚠️ No se encontró el archivo de mock para @shopify/react-native-skia:', SKIA_MOCK_PATH);
  } else {
    console.log('✅ Mock de @shopify/react-native-skia disponible');
  }
  
  return mockExists.skia;
}

// Verificar mocks al cargar
verifyMocks();

module.exports = {
  resolveRequest,
  verifyMocks,
  // Función de utilidad para convertir rutas
  toPosixPath: toPosixPathSafe
};