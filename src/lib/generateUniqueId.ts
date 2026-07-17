export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 6)
}

export async function generateUniqueId(
  name: string,
  attemptInsert: (candidate: string) => Promise<{ ok: boolean }>,
  maxAttempts = 5,
  makeSuffix: () => string = randomSuffix
): Promise<string> {
  const base = slugify(name)
  for (let i = 0; i < maxAttempts; i++) {
    const candidate = `${base}-${makeSuffix()}`
    const result = await attemptInsert(candidate)
    if (result.ok) return candidate
  }
  throw new Error('Could not generate a unique product ID after multiple attempts')
}
