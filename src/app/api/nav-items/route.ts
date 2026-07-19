import { NextResponse } from 'next/server'
import { getNavItems } from '@/lib/db'

export async function GET() {
  const navItems = await getNavItems()
  return NextResponse.json(navItems)
}
