import { Item } from "src/items/entities/abstracts/item.abstract";
import { CharacterAttributes } from "../entities/character-attributes.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { Armor } from "src/items/entities/armor.entity";

export class FindPlayableCharactersByUserIdResponseDto {
    characters: CharacterDto[];
}

class CharacterDto {
    characterId: number;
    characterName: string;
    inventory: Item[];
    equippedArmor: Armor;
    equippedWeapon: Weapon;
    characterAttributes: CharacterAttributes;
}
