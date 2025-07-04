import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { SaveWeaponPresetPort, SaveWeaponPresetUseCase } from "./usecases/save-weapon-preset.usecase";
import { WeaponPreset } from "../entities/weapon-preset.entity";
import { ItemType } from "../enums/item-type.enum";
import { User } from "src/users/entities/user.entity";
import { BadRequestException } from "@nestjs/common";

export class SaveWeaponPresetService implements SaveWeaponPresetUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface,
    ) {}

    async execute(payload: SaveWeaponPresetPort): Promise<WeaponPreset> {
        const { modifierAttribute, dice, userId, itemName, baseDamage } = payload;

        const allowedAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        if(!allowedAttributes.includes(modifierAttribute)) throw new BadRequestException();

        const diceRegex = /^\d+d(2|3|4|6|8|10|12|20)$/;
        if(!diceRegex.test(dice)) throw new BadRequestException();

        let weaponPreset = new WeaponPreset();
        weaponPreset.baseDamage = baseDamage;
        weaponPreset.modifierAttribute = modifierAttribute;
        weaponPreset.dice = dice;
        weaponPreset.itemName = itemName;
        weaponPreset.creator = { id: userId } as User;
        weaponPreset.itemType = ItemType.Weapon;

        await this.itemPresetRepository.save(weaponPreset);

        return weaponPreset;
    }
}
