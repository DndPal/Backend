import { ChildEntity, Column } from "typeorm";
import { Item } from "./abstracts/item.abstract";

@ChildEntity('armor')
export class Armor extends Item {
    @Column({ name: 'base_armor_class' })
    baseArmorClass: number;
}