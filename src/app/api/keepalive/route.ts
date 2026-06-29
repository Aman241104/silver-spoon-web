import { NextResponse } from 'next/server'

export async function GET() {
  const start = Date.now()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=id&limit=1`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        'Accept-Profile': 'public',
      },
      cache: 'no-store',
    }
  )
  return NextResponse.json({ ok: res.ok, ms: Date.now() - start })
}
