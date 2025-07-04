import { ApiProperty } from "@nestjs/swagger";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { Dice } from "src/dice/types/dice.type";

export class ProvideItemToCharacterResponseDto {
    @ApiProperty({ type: 'number' })
    itemId: number;

    @ApiProperty({ type: 'string' })
    itemName: string;

    @ApiProperty({ type: () => CharacterAttributes })
    modifierAttribute: CharacterAttribute;

    @ApiProperty({ type: 'string' })
    dice: Dice;

    @ApiProperty({ type: 'number' })
    ownerId: number;
}
