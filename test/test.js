import { readdirSync } from 'fs';
import { argv } from 'process';

const [,, filter] = argv;

let cnt = 0;
for (const name of readdirSync(new URL('./cases', import.meta.url))) {
  if (filter && !name.startsWith(filter))
    continue;
  const { default: test } = await import(`./cases/${name}`);
  cnt++;
  try {
    await test();
    process.stdout.write('.');
  }
  catch (err) {
    console.error('\n\nError running test ' + name);
    throw err;
  }
}

console.log(`\n\n${cnt} tests passed successfully.`);
