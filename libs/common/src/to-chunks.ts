export const toChunks = <T>(array: T[], size = 1000): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunks.push(chunk);
  }

  return chunks;
};
