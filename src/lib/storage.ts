'use client';

const PREFIX = 'qt-prayer-';

export function saveMemo(date: string, stepId: number, text: string) {
  if (typeof window === 'undefined') return;
  const key = `${PREFIX}memo-${date}-${stepId}`;
  localStorage.setItem(key, text);
}

export function getMemo(date: string, stepId: number): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`${PREFIX}memo-${date}-${stepId}`) || '';
}

export function markCompleted(date: string) {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  if (!history.includes(date)) {
    history.push(date);
    localStorage.setItem(`${PREFIX}history`, JSON.stringify(history));
  }
}

export function isCompleted(date: string): boolean {
  return getHistory().includes(date);
}

export function getHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(`${PREFIX}history`) || '[]');
  } catch {
    return [];
  }
}

export function getStartDate(): string {
  if (typeof window === 'undefined') return '2026-04-13';
  return localStorage.getItem(`${PREFIX}start-date`) || '2026-04-13';
}

export function getDateString(date?: Date): string {
  const d = date || new Date();
  return d.toISOString().split('T')[0];
}
