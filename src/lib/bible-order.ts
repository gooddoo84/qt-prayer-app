// 성경 읽기 순서: 마태복음 2장부터 시작 → 신약 → 구약 전체
// 각 항목: [책 이름(한글), 책 이름(영문 약어), 총 장 수]

const BIBLE_BOOKS: [string, string, number][] = [
  // 신약 (마태복음부터)
  ['마태복음', 'matt', 28],
  ['마가복음', 'mark', 16],
  ['누가복음', 'luke', 24],
  ['요한복음', 'john', 21],
  ['사도행전', 'acts', 28],
  ['로마서', 'rom', 16],
  ['고린도전서', '1cor', 16],
  ['고린도후서', '2cor', 13],
  ['갈라디아서', 'gal', 6],
  ['에베소서', 'eph', 6],
  ['빌립보서', 'phil', 4],
  ['골로새서', 'col', 4],
  ['데살로니가전서', '1thess', 5],
  ['데살로니가후서', '2thess', 3],
  ['디모데전서', '1tim', 6],
  ['디모데후서', '2tim', 4],
  ['디도서', 'titus', 3],
  ['빌레몬서', 'phlm', 1],
  ['히브리서', 'heb', 13],
  ['야고보서', 'jas', 5],
  ['베드로전서', '1pet', 5],
  ['베드로후서', '2pet', 3],
  ['요한일서', '1john', 5],
  ['요한이서', '2john', 1],
  ['요한삼서', '3john', 1],
  ['유다서', 'jude', 1],
  ['요한계시록', 'rev', 22],
  // 구약
  ['창세기', 'gen', 50],
  ['출애굽기', 'exod', 40],
  ['레위기', 'lev', 27],
  ['민수기', 'num', 36],
  ['신명기', 'deut', 34],
  ['여호수아', 'josh', 24],
  ['사사기', 'judg', 21],
  ['룻기', 'ruth', 4],
  ['사무엘상', '1sam', 31],
  ['사무엘하', '2sam', 24],
  ['열왕기상', '1kgs', 22],
  ['열왕기하', '2kgs', 25],
  ['역대상', '1chr', 29],
  ['역대하', '2chr', 36],
  ['에스라', 'ezra', 10],
  ['느헤미야', 'neh', 13],
  ['에스더', 'esth', 10],
  ['욥기', 'job', 42],
  ['시편', 'ps', 150],
  ['잠언', 'prov', 31],
  ['전도서', 'eccl', 12],
  ['아가', 'song', 8],
  ['이사야', 'isa', 66],
  ['예레미야', 'jer', 52],
  ['예레미야애가', 'lam', 5],
  ['에스겔', 'ezek', 48],
  ['다니엘', 'dan', 12],
  ['호세아', 'hos', 14],
  ['요엘', 'joel', 3],
  ['아모스', 'amos', 9],
  ['오바댜', 'obad', 1],
  ['요나', 'jonah', 4],
  ['미가', 'mic', 7],
  ['나훔', 'nah', 3],
  ['하박국', 'hab', 3],
  ['스바냐', 'zeph', 3],
  ['학개', 'hag', 2],
  ['스가랴', 'zech', 14],
  ['말라기', 'mal', 4],
];

export interface BibleChapter {
  bookKo: string;
  bookEn: string;
  chapter: number;
  totalChapters: number;
  globalIndex: number; // 0-based index across all chapters
}

// Build flat list of all chapters (starting from Matthew 2)
const ALL_CHAPTERS: BibleChapter[] = [];
let idx = 0;
for (const [bookKo, bookEn, totalChapters] of BIBLE_BOOKS) {
  const startChapter = (bookKo === '마태복음') ? 2 : 1;
  for (let ch = startChapter; ch <= totalChapters; ch++) {
    ALL_CHAPTERS.push({ bookKo, bookEn, chapter: ch, totalChapters, globalIndex: idx });
    idx++;
  }
}

export const TOTAL_CHAPTERS = ALL_CHAPTERS.length;

// Get today's chapter based on a start date
export function getTodayChapter(startDate?: string): BibleChapter {
  const start = new Date(startDate || '2026-04-13');
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const index = ((daysDiff % TOTAL_CHAPTERS) + TOTAL_CHAPTERS) % TOTAL_CHAPTERS;
  return ALL_CHAPTERS[index];
}

export function getChapterByIndex(index: number): BibleChapter {
  return ALL_CHAPTERS[((index % TOTAL_CHAPTERS) + TOTAL_CHAPTERS) % TOTAL_CHAPTERS];
}
