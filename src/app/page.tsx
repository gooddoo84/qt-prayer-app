'use client';

import { useEffect, useState } from 'react';
import { getTodayChapter, TOTAL_CHAPTERS, type BibleChapter } from '@/lib/bible-order';
import { getDateString, isCompleted, getStartDate, getHistory } from '@/lib/storage';
import Link from 'next/link';

export default function Home() {
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const ch = getTodayChapter(getStartDate());
    setChapter(ch);
    setCompleted(isCompleted(getDateString()));
    setStreak(getHistory().length);
  }, []);

  if (!chapter) return null;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📖</div>
        <h1 className="text-2xl font-bold mb-1">QT 7분법 기도</h1>
        <p className="text-zinc-500 text-sm">매일 말씀과 함께하는 기도</p>
      </div>

      {/* Today's Chapter Card */}
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">오늘의 말씀</div>
        <div className="text-2xl font-bold mb-1">{chapter.bookKo} {chapter.chapter}장</div>
        <div className="text-zinc-500 text-sm">
          {chapter.bookKo} {chapter.chapter}/{chapter.totalChapters}장
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>전체 진행률</span>
            <span>{chapter.globalIndex + 1} / {TOTAL_CHAPTERS}</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-600 rounded-full transition-all"
              style={{ width: `${((chapter.globalIndex + 1) / TOTAL_CHAPTERS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="text-center mb-6">
          <span className="text-violet-400 text-sm">🔥 {streak}일 기도 완료</span>
        </div>
      )}

      {/* Start Button */}
      {completed ? (
        <div className="text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-zinc-400 text-sm mb-4">오늘의 기도를 완료했어요!</p>
          <Link
            href="/prayer"
            className="text-violet-400 text-sm underline underline-offset-4"
          >
            다시 보기
          </Link>
        </div>
      ) : (
        <Link
          href="/prayer"
          className="w-full max-w-sm block text-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          기도 시작하기 🙏
        </Link>
      )}

      {/* Footer */}
      <p className="text-zinc-700 text-xs mt-10 text-center">
        매일 1장씩, 성경 전체를 함께 읽어요
      </p>
    </div>
  );
}
