import { Character } from "../entities/character.entity";

export interface CharacterRepositoryInterface {
    save(character: Character): Promise<void>,
    findById(id: number): Promise<Character>,
    remove(character: Character): Promise<void>
    update(id: number, statName: string, newValue: number): Promise<void>
}