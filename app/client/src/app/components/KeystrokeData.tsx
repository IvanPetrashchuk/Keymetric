import { KeystrokeStatsView } from './KeystrokeStatsView';
import { KeystrokeStats } from '../page';

async function getInitialStats(): Promise<KeystrokeStats> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${apiUrl}/keystroke/stats`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch initial keystroke stats');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { totalCount: 0, keyCounts: [] };
  }
}

export default async function KeystrokeData() {
  const initialStats = await getInitialStats();

  return <KeystrokeStatsView initialStats={initialStats} />;
}