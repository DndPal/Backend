import { ApiProperty } from "@nestjs/swagger";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

class CharacterAttributesDto {
    @ApiProperty({ type: 'number' })
    strength: number;

    @ApiProperty({ type: 'number' })
    dexterity: number;

    @ApiProperty({ type: 'number' })
    wisdom: number;

    @ApiProperty({ type: 'number' })
    intelligence: number;

    @ApiProperty({ type: 'number' })
    charisma: number;

    @ApiProperty({ type: 'number' })
    constitution: number;

    @ApiProperty({ type: 'number' })
    hitPoints: number;

    @ApiProperty({ type: 'number' })
    armorClass: number;
}

export class AddNonPlayableCharacterToPartyResponseDto {
    @ApiProperty({ type: 'number' })
    characterId: number;

    @ApiProperty({ type: 'string' })
    characterName: string;

    @ApiProperty({ type: () => CharacterAttributesDto })
    characterAttributes: CharacterAttributesDto;

    @ApiProperty({ type: 'number' })
    partyId: number;

    @ApiProperty({ type: () => Item, isArray: true })
    inventory: Item[];

    @ApiProperty({ type: () => Armor })
    equippedArmor: Armor;

    @ApiProperty({ type: () => Weapon })
    equippedWeapon: Weapon; 
}
