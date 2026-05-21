'use client'

import { use } from 'react'
import { ESSAYS } from '@/lib/data'
import { EssayReader } from '@/components/essay-reader'
import { notFound } from 'next/navigation'

export default function EssayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params)
  const id = Number(rawId)
  if (isNaN(id) || id < 0 || id >= ESSAYS.length) notFound()
  return <EssayReader id={id} />
}
