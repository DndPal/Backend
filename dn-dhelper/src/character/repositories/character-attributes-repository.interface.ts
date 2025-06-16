import { CharacterAttributes } from "../entities/character-attributes.entity";

export interface CharacterAttributesRepositoryInterface {
    save(characterAttributes: CharacterAttributes): Promise<void>;
    findByCharacterId(characterId: number): Promise<CharacterAttributes>;
}