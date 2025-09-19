export default async function run(main: Function) {
  if (typeof Buffer === 'undefined') {
    throw new Error('Programs require Buffer to run');
  }
  if (typeof Promise === 'undefined') {
    throw new Error('Programs require Promise to run');
  }

  try {
    const input =
      typeof process !== 'undefined' ? await read(process.stdin) : '';
    let result = await main.apply(null, parse(input || '[]'));
    console.log(result);
  } catch (e) {
    console.error(`Error running program`, e);
  }
}

function parse(text: string): any {
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON: ${text}`);
  }
}

async function read(stream: any) {
  const chunks = [];
  if (stream.isTTY) {
    return '';
  }
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
