'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTodayChapter, type BibleChapter } from '@/lib/bible-order';
import { PRAYER_STEPS } from '@/lib/prayer-steps';
import { saveMemo, getMemo, markCompleted, getDateString, getStartDate } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function PrayerPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = bible reading, 1-7 = prayer steps
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [bibleText, setBibleText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [memos, setMemos] = useState<Record<number, string>>({});
  const today = getDateString();

  useEffect(() => {
    const ch = getTodayChapter(getStartDate());
    setChapter(ch);
    fetchBible(ch);
    // Load saved memos
    const saved: Record<number, string> = {};
    for (let i = 1; i <= 7; i++) {
      saved[i] = getMemo(today, i);
    }
    setMemos(saved);
  }, [today]);

  async function fetchBible(ch: BibleChapter) {
    setLoading(true);
    try {
      // Use bible-api.com for Korean text
      const res = await fetch(`https://bible-api.com/${ch.bookEn}+${ch.chapter}?translation=kr`);
      if (res.ok) {
        const data = await res.json();
        setBibleText(data.text || '성경 텍스트를 불러올 수 없습니다.');
        generateSummary(ch, data.text);
      } else {
        setBibleText(`${ch.bookKo} ${ch.chapter}장의 말씀을 묵상하세요.\n\n(성경 API를 사용할 수 없습니다. 성경책을 펴고 읽어주세요.)`);
        setSummary(`${ch.bookKo} ${ch.chapter}장을 천천히 읽고 하나님의 음성에 귀 기울여 보세요.`);
      }
    } catch {
      setBibleText(`${ch.bookKo} ${ch.chapter}장의 말씀을 묵상하세요.\n\n(오프라인 상태입니다. 성경책을 펴고 읽어주세요.)`);
      setSummary(`${ch.bookKo} ${ch.chapter}장을 천천히 읽고 하나님의 음성에 귀 기울여 보세요.`);
    }
    setLoading(false);
  }

  function generateSummary(ch: BibleChapter, text: string) {
    // Simple client-side summary (no API key needed)
    const sentences = text.split(/[.!?]\s/).filter(Boolean);
    const first3 = sentences.slice(0, 3).join('. ');
    setSummary(`${ch.bookKo} ${ch.chapter}장은 ${first3.substring(0, 200)}...에 대한 말씀입니다. 하나님의 뜻을 깊이 묵상해 보세요.`);
  }

  const handleMemoChange = useCallback((stepId: number, text: string) => {
    setMemos(prev => ({ ...prev, [stepId]: text }));
    saveMemo(today, stepId, text);
  }, [today]);

  function handleComplete() {
    markCompleted(today);
    router.push('/prayer/complete');
  }

  if (!chapter) return null;

  const currentPrayerStep = step > 0 ? PRAYER_STEPS[step - 1] : null;
  const totalSteps = PRAYER_STEPS.length + 1; // bible + 7 steps
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => router.push('/')} className="text-zinc-500 text-sm">
            ← 홈
          </button>
          <span className="text-xs text-zinc-500">
            {step === 0 ? '묵상' : `${step}/7`}
          </span>
          <span className="text-xs text-zinc-500">
            {chapter.bookKo} {chapter.chapter}장
          </span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6 overflow-y-auto pb-28">
        {step === 0 ? (
          /* Step 0: Bible Reading */
          <div className="page-enter">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📖</div>
              <h2 className="text-xl font-bold">{chapter.bookKo} {chapter.chapter}장</h2>
              <p className="text-zinc-500 text-sm mt-1">오늘의 말씀을 묵상하세요</p>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-pulse text-zinc-500">말씀을 불러오는 중...</div>
              </div>
            ) : (
              <>
                {/* Bible Text */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-5">
                  <div className="text-sm leading-7 text-zinc-300 whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {bibleText}
                  </div>
                </div>

                {/* AI Summary */}
                {summary && (
                  <div className="bg-violet-950/30 border border-violet-900/50 rounded-xl p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">🤖</span>
                      <span className="text-xs font-medium text-violet-400">요약</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-6">{summary}</p>
                  </div>
                )}

                {/* Memo */}
                <textarea
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-violet-700 min-h-[80px]"
                  placeholder="말씀을 통해 느낀 점을 적어보세요..."
                  value={memos[1] || ''}
                  onChange={e => handleMemoChange(1, e.target.value)}
                />
              </>
            )}
          </div>
        ) : currentPrayerStep ? (
          /* Steps 1-7: Prayer Steps */
          <div className="page-enter" key={step}>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">{currentPrayerStep.icon}</div>
              <h2 className="text-xl font-bold">{currentPrayerStep.title}</h2>
              <p className="text-violet-400 text-xs mt-1">{currentPrayerStep.subtitle}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
              <p className="text-sm text-zinc-300 leading-6">{currentPrayerStep.guide}</p>
            </div>

            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-violet-700 min-h-[120px]"
              placeholder={currentPrayerStep.placeholder}
              value={memos[currentPrayerStep.id] || ''}
              onChange={e => handleMemoChange(currentPrayerStep.id, e.target.value)}
            />
          </div>
        ) : null}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-800 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-3 max-w-sm mx-auto">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 bg-zinc-800 text-zinc-300 rounded-xl text-sm font-medium"
            >
              ← 이전
            </button>
          )}
          {step < PRAYER_STEPS.length ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              다음 단계 →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              기도 완료 ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
