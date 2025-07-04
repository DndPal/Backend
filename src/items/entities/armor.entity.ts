import { ChildEntity, Column, JoinColumn, OneToOne } from "typeorm";
import { Item } from "./abstracts/item.abstract";
import { Character } from "src/character/entities/abstracts/character.abstract";

@ChildEntity('armor')
export class Armor extends Item {
    @Column({ name: 'base_armor_class' })
    baseArmorClass: number;

    @OneToOne(() => Character, (character) => character.equippedArmor, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    armorEquippedBy: Character;
}
