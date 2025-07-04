import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

export class JoinPartyResponseDto {
    partyLeaderId: number;
    partyId: number;
    members: PartyMemberDto[];
    characterSlots: number;
}

export class PartyMemberDto {
    characterId: number;
    characterName: string;
    character_type: string;
    inventory: Item[]; 
    equippedArmor: Armor;
    equippedWeapon: Weapon;
    characterAttributes: CharacterAttributes;   
}
