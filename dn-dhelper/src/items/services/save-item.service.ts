import { Armor } from "../entities/armor.entity";
import { Weapon } from "../entities/weapon.entity";
import { ItemType } from "../enums/item-type.enum";
import { ItemRepositoryInterface } from "../repositories/item-repository.interface";
import { SaveItemPort, SaveItemUseCase } from "./usecases/save-item.service";

export class SaveItemService implements SaveItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepositoryInterface
    ) {}

    async execute(payload: SaveItemPort) {
        const { itemPreset, character } = payload;
        console.log(itemPreset);

        const itemClassMap = {
            [ItemType.Weapon]: Weapon,
            [ItemType.Armor]: Armor
        };

        const ItemClass =  itemClassMap[itemPreset.itemType]

        const item = new ItemClass();
        console.log(item);

        for(const key of Object.keys(itemPreset)) {
            if (itemPreset[key] === undefined) continue;
            item[key] = itemPreset[key]
        };

        item.owner = character;

        console.log(item.itemName);

        await this.itemRepository.save(item);
    }

}