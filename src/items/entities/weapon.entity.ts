import { ChildEntity, Column, JoinColumn, OneToOne } from "typeorm";
import { Item } from "./abstracts/item.abstract";
import { Character } from "src/character/entities/abstracts/character.abstract";

@ChildEntity()
export class Weapon extends Item {
    @Column({ name: 'base_damage' })
    baseDamage: number;

    @OneToOne(() => Character, (character) => character.equippedWeapon, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    weaponEquippedBy: Character;
}

