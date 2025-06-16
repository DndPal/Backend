import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { SaveArmorPresetPort, SaveArmorPresetUseCase } from "./usecases/save-armor-preset.usecase";
import { ArmorPreset } from "../entities/armor-preset.entity";
import { ItemType } from "../enums/item-type.enum";
import { User } from "src/user/entities/user.entity";

export class SaveArmorPresetService implements SaveArmorPresetUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface,
    ) {}

    async execute(payload: SaveArmorPresetPort): Promise<void> {
        const { modifierAttribute, dice, userId, itemName, baseArmorClass } = payload;

        let armorPreset = new ArmorPreset();
        armorPreset.baseArmorClass = baseArmorClass;
        armorPreset.modifierAttribute = modifierAttribute;
        armorPreset.dice = dice;
        armorPreset.itemName = itemName;
        armorPreset.creator = { id: userId } as User;
        armorPreset.itemType = ItemType.Armor;

        await this.itemPresetRepository.save(armorPreset);
    }
}