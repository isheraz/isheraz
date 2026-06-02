import { NextResponse } from 'next/server';
import { fetchGithubData } from '@/lib/github';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  console.log('[API] /api/github called');
  const data = await fetchGithubData();
  console.log(`[API] Returning data for totalContributions: ${data?.totalContributions}`);
  return NextResponse.json(data);
}
