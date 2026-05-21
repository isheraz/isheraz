'use client'
import EducationDetail from '@/components/education-detail'
import { EDU_ALL } from '@/lib/data'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function EducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params)
  const id = Number(rawId)
  if (isNaN(id) || id < 0 || id >= EDU_ALL.length) notFound()
  return <EducationDetail id={id} />
}
