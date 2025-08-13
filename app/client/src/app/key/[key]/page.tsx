import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

interface KeyCount {
  key: string;
  count: number;
}

interface KeyPageProps {
  params: {
    key: string;
  };
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${apiUrl}/keystroke/stats`);
  const { keyCounts } = await res.json();

  return keyCounts.map((kc: KeyCount) => ({
    key: kc.key,
  }));
}

async function getKeyData(currentKey: string): Promise<{
  currentKeyStats: KeyCount | undefined;
  navKeys: { prevKey: string | null; nextKey: string | null };
}> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const res = await fetch(`${apiUrl}/keystroke/stats`, { next: { revalidate: 60 } });
  const { keyCounts } = await res.json();

  const sortedKeys = keyCounts.sort((a: KeyCount, b: KeyCount) => b.count - a.count);
  const currentIndex = sortedKeys.findIndex((kc: KeyCount) => kc.key === currentKey);

  if (currentIndex === -1) {
    return { currentKeyStats: undefined, navKeys: { prevKey: null, nextKey: null } };
  }

  const prevKey = sortedKeys[currentIndex - 1]?.key || null;
  const nextKey = sortedKeys[currentIndex + 1]?.key || null;

  return {
    currentKeyStats: sortedKeys[currentIndex],
    navKeys: { prevKey, nextKey },
  };
}

export default async function KeyPage({ params }: KeyPageProps) {
  const { key } = params;
  const { currentKeyStats, navKeys } = await getKeyData(key);

  if (!currentKeyStats) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Статистика для клавіші: "{currentKeyStats.key}"</h1>
      <p className={styles.counter}>
        Кількість натискань: <strong>{currentKeyStats.count}</strong>
      </p>

      <div className={styles.navigation}>
        {navKeys.prevKey && (
          <Link href={`/key/${encodeURIComponent(navKeys.prevKey)}`} passHref>
            <button className={styles.navButton}>Назад (до {navKeys.prevKey})</button>
          </Link>
        )}
        {navKeys.nextKey && (
          <Link href={`/key/${encodeURIComponent(navKeys.nextKey)}`} passHref>
            <button className={styles.navButton}>Вперед (до {navKeys.nextKey})</button>
          </Link>
        )}
      </div>
    </div>
  );
}
