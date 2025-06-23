import { Character } from "../entities/abstracts/character.entity";

export interface CharacterRepositoryInterface {
    save(character: Character): Promise<void>,
    findById(id: number): Promise<Character>,
    remove(character: Character): Promise<void>,
    update(id: number, statName: string, newValue: number): Promise<void>,
    findCharacterByIdAndUserId(characterId: number, userId: number): Promise<Character>
}