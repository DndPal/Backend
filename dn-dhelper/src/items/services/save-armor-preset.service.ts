import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { SaveArmorPresetPort, SaveArmorPresetUseCase } from "./usecases/save-armor-preset.usecase";
import { ArmorPreset } from "../entities/armor-preset.entity";
import { ItemType } from "../enums/item-type.enum";
import { User } from "src/users/entities/user.entity";
import { BadRequestException } from "@nestjs/common";

export class SaveArmorPresetService implements SaveArmorPresetUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface,
    ) {}

    async execute(payload: SaveArmorPresetPort): Promise<ArmorPreset> {
        const { modifierAttribute, dice, userId, itemName, baseArmorClass } = payload;

        const allowedAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        if(!allowedAttributes.includes(modifierAttribute)) throw new BadRequestException();

        const diceRegex = /^\d+d(2|3|4|6|8|10|12|20)$/;
        if(!diceRegex.test(dice)) throw new BadRequestException();

        let armorPreset = new ArmorPreset();
        armorPreset.baseArmorClass = baseArmorClass;
        armorPreset.modifierAttribute = modifierAttribute;
        armorPreset.dice = dice;
        armorPreset.itemName = itemName;
        armorPreset.creator = { id: userId } as User;
        armorPreset.itemType = ItemType.Armor;

        await this.itemPresetRepository.save(armorPreset);

        return armorPreset;
    }
}