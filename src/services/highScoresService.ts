import highScoresApi from '@/lib/highScoresApi';
import type { TimeSpanLeaderboard } from '@/types/TimeSpanLeaderboard';

export async function getLast24hrLeaderboard(): Promise<TimeSpanLeaderboard> {
    const response = await highScoresApi.get<TimeSpanLeaderboard>('/last24HourLeaderboard');
    return response.data;
}
