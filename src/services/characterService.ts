import highScoresApi from '@/lib/highScoresApi';
import type { Character } from '@/types/Character';

export async function getCharacters(): Promise<Character[]> {
    const response = await highScoresApi.get<Character[]>('/characterNames');
    return response.data;
}
