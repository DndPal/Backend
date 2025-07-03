import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

export class GetPartyByPartyIdResponseDto {
    partyId: number;
    partyLeader: PartyLeaderDto;
    members: PartyMemberDto[];
    characterSlots: number;
}

class PartyMemberUserDto {
    id: number;
    username: string;
}

class PartyMemberDto {
    characterId: number;
    characterName: string;
    character_type: string;
    inventory: Item[]; 
    equippedWeapon: Weapon;
    equippedArmor: Armor;
    characterAttributes: CharacterAttributes;
    user: PartyMemberUserDto;
}

class PartyLeaderDto {
    id: number;
    username: string;
}
