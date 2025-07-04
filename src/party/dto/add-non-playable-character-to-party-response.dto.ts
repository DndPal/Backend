import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

export class AddNonPlayableCharacterToPartyResponseDto {
    characterId: number;
    characterName: string;
    characterAttributes: CharacterAttributesDto;
    partyId: number;
    inventory: Item[];
    equippedArmor: Armor;
    equippedWeapon: Weapon; 
}

class CharacterAttributesDto {
    strength: number;
    dexterity: number;
    wisdom: number;
    intelligence: number;
    charisma: number;
    constitution: number;
    hitPoints: number;
    armorClass: number;
}

