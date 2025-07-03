import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { UseCase } from "src/common/usecase.common";

export type AlterCharacterAttributesPort = {
    characterAttributes: CharacterAttributes,
    hitPoints?: number;
    armorClass?: number;
    dexterity?: number;
    strength?: number;
    charisma?: number;
    wisdom?: number;
    constitution?: number;
    intelligence?: number;
}

export interface AlterCharacterAttributesUseCase extends UseCase<AlterCharacterAttributesPort, CharacterAttributes> {}
