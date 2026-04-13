'use client';

import { useEffect, useState } from 'react';
import { getTodayEncouragement } from '@/lib/encouragements';
import { getTodayChapter, TOTAL_CHAPTERS } from '@/lib/bible-order';
import { getHistory, getStartDate } from '@/lib/storage';
import Link from 'next/link';

export default function CompletePage() {
  const [encouragement, setEncouragement] = useState<{ emoji: string; title: string; body: string } | null>(null);
  const [stats, setStats] = useState({ total: 0, progress: 0, bookKo: '', chapter: 0 });

  useEffect(() => {
    setEncouragement(getTodayEncouragement());
    const ch = getTodayChapter(getStartDate());
    setStats({
      total: getHistory().length,
      progress: ch.globalIndex + 1,
      bookKo: ch.bookKo,
      chapter: ch.chapter,
    });
  }, []);

  if (!encouragement) return null;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      {/* Celebration */}
      <div className="text-center mb-8 page-enter">
        <div className="text-6xl mb-4">{encouragement.emoji}</div>
        <h1 className="text-2xl font-bold mb-2">{encouragement.title}</h1>
        <p className="text-zinc-400 text-sm leading-6 max-w-xs mx-auto">
          {encouragement.body}
        </p>
      </div>

      {/* Stats Card */}
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-violet-400">{stats.total}</div>
            <div className="text-xs text-zinc-500 mt-1">기도 완료 일수</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">
              {((stats.progress / TOTAL_CHAPTERS) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-zinc-500 mt-1">성경 진행률</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
          <div className="text-sm text-zinc-400">
            오늘: {stats.bookKo} {stats.chapter}장
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-violet-600 rounded-full"
              style={{ width: `${(stats.progress / TOTAL_CHAPTERS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Home Button */}
      <Link
        href="/"
        className="w-full max-w-sm block text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-3.5 rounded-xl transition-colors"
      >
        홈으로 돌아가기
      </Link>

      <p className="text-zinc-700 text-xs mt-8">내일도 함께 기도해요 🙏</p>
    </div>
  );
}
