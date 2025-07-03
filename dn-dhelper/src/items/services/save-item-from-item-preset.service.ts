import { Item } from "../entities/abstracts/item.abstract";
import { Armor } from "../entities/armor.entity";
import { Weapon } from "../entities/weapon.entity";
import { ItemType } from "../enums/item-type.enum";
import { ItemRepositoryInterface } from "../repositories/item-repository.interface";
import { SaveItemFromItemPresetPort, SaveItemFromItemPresetUseCase } from "./usecases/save-item-from-item-preset.usecase";

export class SaveItemFromItemPresetService implements SaveItemFromItemPresetUseCase {
    constructor(
        private readonly itemRepository: ItemRepositoryInterface
    ) {}

    async execute(payload: SaveItemFromItemPresetPort): Promise<Item> {
        const { itemPreset, character } = payload;

        const itemClassMap = {
            [ItemType.Weapon]: Weapon,
            [ItemType.Armor]: Armor
        };

        const ItemClass =  itemClassMap[itemPreset.itemType]

        const item = new ItemClass();

        for(const key of Object.keys(itemPreset)) {
            if (itemPreset[key] === undefined) continue;
            item[key] = itemPreset[key]
        };

        item.owner = character;

        await this.itemRepository.save(item);

        return item;
    }
}
