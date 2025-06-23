import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { EquipItemPort, EquipItemUseCase } from "./usecases/equip-armor.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Character } from "../entities/abstracts/character.entity";
import { FindItemByIdAndCharacterIdUseCase } from "src/items/services/usecases/find-item-by-id-and-character-id.usecase";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

export class EquipItemService implements EquipItemUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly findItemByIdAndCharacterId: FindItemByIdAndCharacterIdUseCase
    ) {}

    async execute(payload: EquipItemPort): Promise<void> {
        const { characterId, itemId, userId } = payload;

        const equipSlotMap = {
            Armor: 'equipedArmor',
            Weapon: 'equipedWeapon'
        }

        const character: Character = await this.characterRepository.findCharacterByIdAndUserId(characterId, userId);
        if(!character) throw new UnauthorizedException('Character does not exist');

        const item: Item = await this.findItemByIdAndCharacterId.execute({ itemId: itemId, characterId: characterId });
        if(!item) throw new UnauthorizedException('Item does not exist');

        const itemSlot: string = equipSlotMap[item.constructor.name];
        if(!itemSlot) throw new UnauthorizedException('Item is not equipable');
        
        (character as Character)[itemSlot] = item;
        
        await this.characterRepository.save(character);
    }
}