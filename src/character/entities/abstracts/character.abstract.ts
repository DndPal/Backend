import { Party } from "src/party/entities/party.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { CharacterAttributes } from "../character-attributes.entity";

@Entity('characters')
@TableInheritance({ column: { type: "varchar", name: "character_type" }})
export abstract class Character {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'character_name' })
    name: string;

    @OneToMany(() => Item, (item) => item.owner)
    inventory: Item[];

    @ManyToOne(() => Party, (party) => party.members, { onDelete: 'SET NULL' })
    @Index('idx_characters_on_parties')
    @JoinColumn()
    party: Party;

    @OneToOne(() => Armor, (armor) => armor.armorEquippedBy, { nullable: true })
    equippedArmor: Armor;

    @OneToOne(() => Weapon, (weapon) => weapon.weaponEquippedBy, { nullable: true })
    equippedWeapon: Weapon;

    @Column()
    readonly character_type: string;

    @ManyToOne(() => User, (user) => user.characters, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_user_id' })
    @Index('idx_characters_on_users')
    user?: User;

    @OneToOne(() => CharacterAttributes, (characterAttributes) => characterAttributes.character)
    characterAttributes: CharacterAttributes;

    abstract UserHasOwnership(user: User): boolean;
}
