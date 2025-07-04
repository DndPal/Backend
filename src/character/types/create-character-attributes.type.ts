import { Character } from "../entities/abstracts/character.abstract";

export type CreateCharacterAttributesPayload = {
    strength?: number,
    intelligence?: number,
    dexterity?: number,
    wisdom?: number,
    constitution?: number,
    charisma?: number;
    hitPoints?: number;
    armorClass?: number;
    character?: Character;
}
