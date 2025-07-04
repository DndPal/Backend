import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { CharacterAttributes } from "../entities/character-attributes.entity";

export class FindPlayableCharacterByIdResponseDto {
    characterId: number;
    characterName: string;
    characterAttributes: CharacterAttributes;
    inventory: Item[];
    equippedArmor: Armor;
    equippedWeapon: Weapon;
}
