// app/client/src/stores/keystrokeStore.ts
import { makeObservable, observable, action } from 'mobx';
import io from 'socket.io-client';

interface KeyCount {
  key: string;
  count: number;
}

interface KeystrokeStats {
  totalCount: number;
  keyCounts: KeyCount[];
}

class KeystrokeStore {
  stats: KeystrokeStats = { totalCount: 0, keyCounts: [] };
  socket: any;

  constructor() {
    makeObservable(this, {
      stats: observable,
      setStats: action,
    });
    
    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001'); 
    this.setupSocketListeners();
  }

  setupSocketListeners() {
    this.socket.on('keystroke_stats', (stats: KeystrokeStats) => {
      this.setStats(stats);
    });
  }

  setStats(stats: KeystrokeStats) {
    this.stats = stats;
  }

  sendKeystroke(key: string) {
    this.socket.emit('keystroke', { key });
  }
}

export const keystrokeStore = new KeystrokeStore();