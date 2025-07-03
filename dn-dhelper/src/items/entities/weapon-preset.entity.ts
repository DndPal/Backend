import { ChildEntity, Column } from "typeorm";
import { ItemPreset } from "./abstracts/item-preset.abstract";

@ChildEntity('weapon_preset')
export class WeaponPreset extends ItemPreset {
    @Column({ name: 'base_damage', nullable: true })
    baseDamage: number;
}
