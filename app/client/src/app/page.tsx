import KeystrokeData from "./components/KeystrokeData";

export interface KeyCount {
  key: string;
  count: number;
}

export interface KeystrokeStats {
  totalCount: number;
  keyCounts: KeyCount[];
}
export default function HomePage() {
  return <KeystrokeData />;
}
