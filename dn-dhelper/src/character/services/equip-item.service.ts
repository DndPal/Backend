import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { EquipItemPort, EquipItemUseCase } from "./usecases/equip-item.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Character } from "../entities/abstracts/character.abstract";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { User } from "src/users/entities/user.entity";
import { SaveItemUseCase } from "src/items/services/usecases/save-item.usecase";
import { Weapon } from "src/items/entities/weapon.entity";
import { Armor } from "src/items/entities/armor.entity";
import { FindItemByIdAndCharacterIdUseCase } from "src/items/services/usecases/find-item-by-id-and-character-id.usecase";

export class EquipItemService implements EquipItemUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase,
        private readonly saveItemService: SaveItemUseCase,
        private readonly findItemByIdAndCharacterIdService: FindItemByIdAndCharacterIdUseCase
    ) {}
    async execute(payload: EquipItemPort): Promise<Character> {
        const { characterId, itemId, userId } = payload;

        const equipSlotMap = {
            Armor: {
                slot: 'equippedArmor',
                equippedBy: 'armorEquippedBy'
            },
            Weapon: {
                slot: 'equippedWeapon',
                equippedBy: 'weaponEquippedBy'
            }
        };

        const user: User = await this.findUserByIdService.execute({ id: userId });
        const character: Character = await this.characterRepository.findById(characterId);

        if (!character || !character.UserHasOwnership(user)) throw new ForbiddenException();

        const item: Item = await this.findItemByIdAndCharacterIdService.execute({ itemId, characterId });
        if (!item) throw new NotFoundException();

        const itemType = item.constructor.name;

        const mapping = equipSlotMap[itemType];
        if (!mapping) throw new ForbiddenException();

        const { slot, equippedBy } = mapping;

        const currentlyEquipped = character[slot];

        if (currentlyEquipped && currentlyEquipped !== item.id) {
            currentlyEquipped[equippedBy] = null;
            currentlyEquipped.owner = character;

            await this.saveItemService.execute({ item: currentlyEquipped });
        }

        item[equippedBy] = character;
        await this.saveItemService.execute({ item });

        const updatedCharacter: Character = await this.characterRepository.findById(characterId);

        return updatedCharacter;
    }
}
