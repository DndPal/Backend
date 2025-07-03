import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { CharacterAttributes } from "../entities/character-attributes.entity";

export class CreatePlayableCharacterResponseDto {
    characterId: number;
    characterName: string;
    characterAttributes: CharacterAttributesDto;
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
