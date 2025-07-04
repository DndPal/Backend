import { CharacterAttributes } from "src/character/entities/character-attributes.entity";

export type CharacterAttribute = Exclude<keyof CharacterAttributes, 'character' | 'attributeId'> 