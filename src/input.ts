export async function input(message: string, type: unknown) {
  // TODO: can use https://www.npmjs.com/package/prompts for Node
  await new Promise((resolve) => setTimeout(resolve, 1000)); // placeholder delay
  return void 0;
}
