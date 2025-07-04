import { ApiProperty } from "@nestjs/swagger";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

export class JoinPartyResponseDto {
    @ApiProperty({ type: 'number' })
    partyLeaderId: number;

    @ApiProperty({ type: 'number' })
    partyId: number;

    @ApiProperty({ type: () => PartyMemberDto, isArray: true })
    members: PartyMemberDto[];

    @ApiProperty({ type: 'number' })
    characterSlots: number;
}

class PartyMemberDto {
    @ApiProperty({ type: 'number' })
    characterId: number;

    @ApiProperty({ type: 'string' })
    characterName: string;

    @ApiProperty({ type: 'string' })
    character_type: string;

    @ApiProperty({ type: () => Item, isArray: true })
    inventory: Item[]; 

    @ApiProperty({ type: () => Armor })
    equippedArmor: Armor;

    @ApiProperty({ type: () => Weapon })
    equippedWeapon: Weapon;

    @ApiProperty({ type: () => CharacterAttributes })
    characterAttributes: CharacterAttributes;   
}
