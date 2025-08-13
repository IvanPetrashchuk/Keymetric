"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { keystrokeStore } from "../stores/keystrokeStore";
import styles from "../css/page.module.css";
import KeystrokeBarChart from "./KeystrokeBarChart";
import { useRouter } from "next/navigation";

interface KeyCount {
  key: string;
  count: number;
}

interface KeystrokeStats {
  totalCount: number;
  keyCounts: KeyCount[];
}

export const KeystrokeStatsView = observer(({ initialStats }: { initialStats: KeystrokeStats }) => {
  const router = useRouter();

  useEffect(() => {
    keystrokeStore.setStats(initialStats);

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCyrillic = /[а-яА-Я]/.test(event.key);
      if (isCyrillic) {
        alert("Дозволено вводити тільки латиницею.");
        return; 
      }

      keystrokeStore.sendKeystroke(event.key);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [initialStats]);

  const handleCounterClick = () => {
    const maxKeystroke = keystrokeStore.stats.keyCounts.reduce(
      (prev, current) => (prev.count > current.count ? prev : current),
      { key: "", count: 0 }
    );

    if (maxKeystroke.count > 0) {
      router.push(`/key/${maxKeystroke.key}`);
    } else {
      alert("Статистика ще не зібрана. Натисніть кілька клавіш!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Клавіатурна аналітика в реальному часі</h1>
      <KeystrokeBarChart data={keystrokeStore.stats.keyCounts} />
      <p className={styles.counter} onClick={handleCounterClick} style={{ cursor: "pointer" }}>
        Загальна кількість натискань: <strong>{keystrokeStore.stats.totalCount}</strong>
      </p>
    </div>
  );
});
