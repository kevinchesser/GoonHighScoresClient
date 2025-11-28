import type { Character } from './Character'
import type { XpDrop } from './XpDrop'

export interface CharacterOverview {
    character: Character
    xpDropsBySkill: Record<number, XpDrop[]>
}