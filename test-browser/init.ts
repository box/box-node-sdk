import path from 'path';
import fs from 'fs';

const testDir = path.resolve(
  process.cwd(),
  'node_modules/box-typescript-sdk-gen/lib-esm/test',
);
const files = fs.readdirSync(testDir);

const importStatements = files
  .filter((file) => file.endsWith('.test.js'))
  .map((file) => file.replace('.js', ''))
  .map((file) => `import('box-typescript-sdk-gen/test/${file}');`)
  .join('\n');

const outputPath = path.resolve(process.cwd(), 'src/utils/importTests.ts');
const outputContent = `${importStatements}
export default function f() {
  // This function is intentionally left empty.
}
`;
fs.writeFileSync(outputPath, outputContent, 'utf8');
