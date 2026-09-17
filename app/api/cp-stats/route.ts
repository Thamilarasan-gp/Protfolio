import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 1800; // Cache for 30 minutes

interface CPStatsResponse {
  leetcode: {
    username: string;
    totalSolved: number;
    rating: number;
    topPercentage: number;
    globalRanking: number;
    url: string;
  };
  skillrack: {
    solved: number;
    rank: number;
    url: string;
  };
  hackerrank: {
    username: string;
    badge: string;
    stars: number;
    url: string;
  };
}

const FALLBACK_STATS: CPStatsResponse = {
  leetcode: {
    username: 'thamilarasangp',
    totalSolved: 527,
    rating: 1866,
    topPercentage: 5.81,
    globalRanking: 189040,
    url: 'https://leetcode.com/u/thamilarasangp/',
  },
  skillrack: {
    solved: 720,
    rank: 43029,
    url: 'https://www.skillrack.com/faces/resume.xhtml?id=484668&key=262cac8aa817e03417f620f487c0e526d5a868cf',
  },
  hackerrank: {
    username: 'thamilarasan_gp1',
    badge: 'C++ 5-Star',
    stars: 5,
    url: 'https://www.hackerrank.com/profile/thamilarasan_gp1',
  },
};

// In-memory cache to guarantee fast response
let cachedData: CPStatsResponse | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

async function fetchLeetCode(): Promise<typeof FALLBACK_STATS.leetcode> {
  const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        topPercentage
        globalRanking
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: JSON.stringify({
        query,
        variables: { username: 'thamilarasangp' },
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`LeetCode status ${res.status}`);
    const data = await res.json();
    const matched = data?.data?.matchedUser;
    const contest = data?.data?.userContestRanking;

    let totalSolved = FALLBACK_STATS.leetcode.totalSolved;
    const acSubs = matched?.submitStatsGlobal?.acSubmissionNum;
    if (Array.isArray(acSubs)) {
      const allItem = acSubs.find((item: any) => item.difficulty === 'All');
      if (allItem?.count) totalSolved = allItem.count;
    }

    const rating = contest?.rating ? Math.round(contest.rating) : FALLBACK_STATS.leetcode.rating;
    const topPercentage = contest?.topPercentage
      ? Number(contest.topPercentage.toFixed(2))
      : FALLBACK_STATS.leetcode.topPercentage;
    const globalRanking = matched?.profile?.ranking || contest?.globalRanking || FALLBACK_STATS.leetcode.globalRanking;

    return {
      username: 'thamilarasangp',
      totalSolved,
      rating,
      topPercentage,
      globalRanking,
      url: 'https://leetcode.com/u/thamilarasangp/',
    };
  } catch (err) {
    console.error('Error fetching LeetCode stats:', err);
    return FALLBACK_STATS.leetcode;
  }
}

async function fetchSkillRack(): Promise<typeof FALLBACK_STATS.skillrack> {
  const skillrackUrl =
    'https://www.skillrack.com/faces/resume.xhtml?id=484668&key=262cac8aa817e03417f620f487c0e526d5a868cf';

  try {
    const res = await fetch(skillrackUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`SkillRack status ${res.status}`);
    const html = await res.text();

    let rank = FALLBACK_STATS.skillrack.rank;
    let solved = FALLBACK_STATS.skillrack.solved;

    // Parse RANK
    // HTML pattern: <i class="... icon chart bar"></i>43029</div>\s*<div class="label">\s*RANK
    const rankMatch = html.match(/chart bar[^>]*><\/i>\s*([0-9,]+)\s*<\/div>\s*<div class="label">\s*RANK/i);
    if (rankMatch && rankMatch[1]) {
      rank = parseInt(rankMatch[1].replace(/,/g, ''), 10);
    }

    // Parse PROGRAMS SOLVED
    // HTML pattern: <i class="... icon code"></i>720</div>\s*<div class="label">\s*PROGRAMS SOLVED
    const solvedMatch = html.match(/code[^>]*><\/i>\s*([0-9,]+)\s*<\/div>\s*<div class="label">\s*PROGRAMS SOLVED/i);
    if (solvedMatch && solvedMatch[1]) {
      solved = parseInt(solvedMatch[1].replace(/,/g, ''), 10);
    }

    return {
      solved,
      rank,
      url: skillrackUrl,
    };
  } catch (err) {
    console.error('Error fetching SkillRack stats:', err);
    return FALLBACK_STATS.skillrack;
  }
}

async function fetchHackerRank(): Promise<typeof FALLBACK_STATS.hackerrank> {
  const url = 'https://www.hackerrank.com/rest/hackers/thamilarasan_gp1/badges';

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`HackerRank status ${res.status}`);
    const data = await res.json();
    const models = data?.models;

    let stars = 5;
    let badge = 'C++ 5-Star';

    if (Array.isArray(models)) {
      const cpp = models.find((m: any) => m.badge_name === 'C++' || m.badge_slug === 'cpp');
      if (cpp && cpp.stars) {
        stars = cpp.stars;
        badge = `C++ ${stars}-Star`;
      }
    }

    return {
      username: 'thamilarasan_gp1',
      badge,
      stars,
      url: 'https://www.hackerrank.com/profile/thamilarasan_gp1',
    };
  } catch (err) {
    console.error('Error fetching HackerRank stats:', err);
    return FALLBACK_STATS.hackerrank;
  }
}

export async function GET() {
  const now = Date.now();
  if (cachedData && now - lastCacheTime < CACHE_TTL_MS) {
    return NextResponse.json(cachedData);
  }

  const [leetcode, skillrack, hackerrank] = await Promise.all([
    fetchLeetCode(),
    fetchSkillRack(),
    fetchHackerRank(),
  ]);

  cachedData = { leetcode, skillrack, hackerrank };
  lastCacheTime = now;

  return NextResponse.json(cachedData);
}
