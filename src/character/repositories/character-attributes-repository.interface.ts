import { CharacterAttributes } from "../entities/character-attributes.entity";

export interface CharacterAttributesRepositoryInterface {
    save(characterAttributes: CharacterAttributes): Promise<void>;
    findById(attributeId: number): Promise<CharacterAttributes>;
    findByCharacterId(characterId: number): Promise<CharacterAttributes>;
}
