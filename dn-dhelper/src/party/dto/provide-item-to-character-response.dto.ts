import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { Dice } from "src/dice/types/dice.type";

export class ProvideItemToCharacterResponseDto {
    itemId: number;
    itemName: string;
    modifierAttribute: CharacterAttribute;
    dice: Dice;
    ownerId: number;
}
