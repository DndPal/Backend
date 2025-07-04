import { Item } from "src/items/entities/abstracts/item.abstract";
import { CharacterAttributes } from "../entities/character-attributes.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { Armor } from "src/items/entities/armor.entity";
import { ApiProperty } from "@nestjs/swagger";

export class FindPlayableCharactersByUserIdResponseDto {
    @ApiProperty({ type: () => CharacterDto, isArray: true })
    characters: CharacterDto[];
}

class CharacterDto {
    @ApiProperty({ type: 'number' })
    characterId: number;

    @ApiProperty({ type: 'string' })
    characterName: string;

    @ApiProperty({ type: () => CharacterAttributes })
    characterAttributes: CharacterAttributes;

    @ApiProperty({ type: () => Item, isArray: true })
    inventory: Item[];

    @ApiProperty({ type: () =>  Armor })
    equippedArmor: Armor;

    @ApiProperty({ type: () => Weapon })
    equippedWeapon: Weapon;
}
