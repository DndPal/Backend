import { Character } from "../entities/abstracts/character.abstract";
import { NonPlayableCharacter } from "../entities/non-playable-character.entity";
import { PlayableCharacter } from "../entities/playable-character.entity";

export interface CharacterRepositoryInterface {
    save(character: Character): Promise<void>;
    findById(id: number): Promise<Character>;
    remove(character: Character): Promise<void>;
    findPlayableCharacterById(id: number): Promise<PlayableCharacter>;
    findNonPlayableCharacterById(id: number): Promise<NonPlayableCharacter>;
    findPlayableCharactersByUserId(userId: number): Promise<PlayableCharacter[]>;
}
