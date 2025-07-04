import { ChildEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ItemPreset } from "./abstracts/item-preset.abstract";

@ChildEntity('armor_preset')
export class ArmorPreset extends ItemPreset {
    @Column({ name: 'base_armor_class', nullable: true })
    baseArmorClass: number;
}
