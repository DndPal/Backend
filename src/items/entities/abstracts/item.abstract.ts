import { Character } from "src/character/entities/abstracts/character.abstract";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { Dice } from "src/dice/types/dice.type";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('items')
@TableInheritance({ column: { type: "varchar", name: "type" }})
export abstract class Item {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'item_name' })
    itemName: string;

    @Column({ name: 'modifier_attribute' })
    modifierAttribute: CharacterAttribute;

    @Column({ name: 'additional_value_dice' })
    dice: Dice;
    
    @ManyToOne(() => Character, (character) => character.inventory, { onDelete: 'CASCADE' })
    @JoinColumn()
    owner: Character;

    constructor() {
        this.itemName = null;
        this.modifierAttribute = null;
        this.dice = null;
        this.owner = null;
    }
}