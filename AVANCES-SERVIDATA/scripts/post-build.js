// Post-build: genera 404.html (fallback SPA en GitHub Pages) y .nojekyll.
// Ejecutado automaticamente despues de `ng build` via npm postbuild.

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '..', '..', '..', 'inverteccupos');
const INDEX = path.join(OUTPUT_DIR, 'index.html');
const NOT_FOUND = path.join(OUTPUT_DIR, '404.html');
const NOJEKYLL = path.join(OUTPUT_DIR, '.nojekyll');
const CNAME = path.join(OUTPUT_DIR, 'CNAME');
const DOMAIN = 'inversionesjog.co';

if (!fs.existsSync(INDEX)) {
  console.error(`\n[X] No existe ${INDEX}. Build incompleto.\n`);
  process.exit(1);
}

fs.copyFileSync(INDEX, NOT_FOUND);
console.log(`[OK] 404.html generado.`);

if (!fs.existsSync(NOJEKYLL)) {
  fs.writeFileSync(NOJEKYLL, '');
  console.log(`[OK] .nojekyll creado.`);
}

if (!fs.existsSync(CNAME) || fs.readFileSync(CNAME, 'utf8').trim() !== DOMAIN) {
  fs.writeFileSync(CNAME, DOMAIN + '\n');
  console.log(`[OK] CNAME asegurado: ${DOMAIN}`);
}

console.log(`\n[OK] Post-build completo en ${OUTPUT_DIR}\n`);
