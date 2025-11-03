// add-devextreme-license.js (en la raíz, junto a package.json)
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'src', 'devextreme-license.ts');
const example = path.join(__dirname, 'src', 'devextreme-license.example.ts');

// ✅ Si existe la variable de entorno DX_LICENSE, la usamos para generar el archivo.
//    Útil para CI/CD o máquinas de otros devs sin tocar el repo.
const envKey = process.env.DX_LICENSE;

function writeWithKey(key) {
  const content =
    `// Archivo generado automáticamente por postinstall\n` +
    `export const licenseKey = ${JSON.stringify(key)};\n`;
  fs.writeFileSync(target, content, 'utf8');
  console.log('> Creado src/devextreme-license.ts con clave desde DX_LICENSE.');
}

try {
  if (fs.existsSync(target)) {
    console.log('> src/devextreme-license.ts ya existe. No se hace nada.');
  } else if (envKey) {
    writeWithKey(envKey);
  } else if (fs.existsSync(example)) {
    fs.copyFileSync(example, target);
    console.log('> Copiado devextreme-license.example.ts -> devextreme-license.ts');
  } else {
    // fallback: crear archivo vacío para no romper el build
    writeWithKey('');
    console.warn('> No hay example ni DX_LICENSE; se creó con licencia vacía.');
  }
} catch (e) {
  console.error('> Error creando devextreme-license.ts:', e);
  process.exit(0); // no rompas la instalación por esto
}
