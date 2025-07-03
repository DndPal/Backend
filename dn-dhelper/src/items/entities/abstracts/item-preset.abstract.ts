import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { Dice } from "src/dice/types/dice.type";
import { ItemType } from "src/items/enums/item-type.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('item_presets')
@TableInheritance({ column: { type: "varchar", name: "type" }})
export abstract class ItemPreset {
    @PrimaryGeneratedColumn({ name: 'id' })
    itemPresetId: number;

    @Column({ name: 'item_name' })
    itemName: string;
        
    @Column({ name: 'modifier_attribute' })
    modifierAttribute: CharacterAttribute;
    
    @Column({ name: 'additional_value_dice' })
    dice: Dice;

    @ManyToOne(() => User, (user) => user.itemPresets, { onDelete: 'SET NULL' })
    @JoinColumn()
    creator: User;

    @Column({ 
        name: 'item_type',
        enum: ItemType,
        type: 'enum' 
    })
    itemType: ItemType;
}