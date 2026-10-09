export interface HistoryItem {
  id: string;
  timestamp: string;
  size: number;
  matrixData: string[][];
  polynomialTex: string;
  isVerified: boolean;
}

const STORAGE_KEY = "cayley_hamilton_history_v1";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch (e) {
    console.error("Failed to read history from localStorage", e);
    return [];
  }
}

export function saveHistoryItem(item: Omit<HistoryItem, "id" | "timestamp">): HistoryItem {
  if (typeof window === "undefined") {
    return {
      ...item,
      id: "temp",
      timestamp: new Date().toLocaleString(),
    };
  }

  try {
    const existing = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: "hist_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Filter out duplicate matrix
    const filtered = existing.filter(
      (h) => JSON.stringify(h.matrixData) !== JSON.stringify(newItem.matrixData)
    );

    const updated = [newItem, ...filtered].slice(0, 20); // keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error("Failed to save history item", e);
    return {
      ...item,
      id: "temp",
      timestamp: new Date().toLocaleString(),
    };
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = getHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to delete history item", e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear history", e);
  }
}
