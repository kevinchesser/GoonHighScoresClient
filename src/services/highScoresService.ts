import highScoresApi from '@/lib/highScoresApi';
import type { TimeSpanLeaderboard } from '@/types/TimeSpanLeaderboard';
import type { CharacterOverview } from '@/types/CharacterOverview';

export async function getLast24hrLeaderboard(): Promise<TimeSpanLeaderboard> {
    const response = await highScoresApi.get<TimeSpanLeaderboard>('/last24HourLeaderboard');
    return response.data;
}

export async function getCharacterOverview(characterName: string): Promise<CharacterOverview> {
    const response = await highScoresApi.get<CharacterOverview>('/' + characterName);
    return response.data;
}