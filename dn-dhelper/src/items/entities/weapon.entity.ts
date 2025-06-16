import { ChildEntity, Column } from "typeorm";
import { Item } from "./abstracts/item.abstract";

@ChildEntity()
export class Weapon extends Item {
    @Column({ name: 'base_damage' })
    baseDamage: number;
}
