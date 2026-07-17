export interface CategoryOption {
  id: string
  name: string
}

interface CustomCategoryRow {
  slug: string
  name: string | null
}

function titleCaseSlug(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function mergeCategories(
  hardcoded: CategoryOption[],
  custom: CustomCategoryRow[]
): CategoryOption[] {
  const knownIds = new Set(hardcoded.map(c => c.id))
  const extras = custom
    .filter(row => !knownIds.has(row.slug))
    .map(row => ({ id: row.slug, name: row.name || titleCaseSlug(row.slug) }))
  return [...hardcoded, ...extras]
}
