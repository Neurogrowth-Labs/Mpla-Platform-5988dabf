import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
const files = globSync('src/**/*.{ts,tsx}').concat(['server.ts']);
const forbidden = [/MPLA South Africa/i, /MPLA-SEDE SA/i, /MPLA SEDE SA/i];
let failed = false;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const rx of forbidden) {
    if (rx.test(text)) {
      console.error(`${file}: contém marca antiga ${rx}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('Marca MPLA Diaspora e textos críticos verificados.');
