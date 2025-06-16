import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { SaveWeaponPresetPort, SaveWeaponPresetUseCase } from "./usecases/save-weapon-preset.usecase";
import { WeaponPreset } from "../entities/weapon-preset.entity";
import { ItemType } from "../enums/item-type.enum";
import { User } from "src/user/entities/user.entity";

export class SaveWeaponPresetService implements SaveWeaponPresetUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface,
    ) {}

    async execute(payload: SaveWeaponPresetPort): Promise<void> {
        const { modifierAttribute, dice, userId, itemName, baseDamage } = payload;

        let weaponPreset = new WeaponPreset();
        weaponPreset.baseDamage = baseDamage;
        weaponPreset.modifierAttribute = modifierAttribute;
        weaponPreset.dice = dice;
        weaponPreset.itemName = itemName;
        weaponPreset.creator = { id: userId } as User;
        weaponPreset.itemType = ItemType.Weapon;

        console.log(weaponPreset);

        await this.itemPresetRepository.save(weaponPreset);
    }
}