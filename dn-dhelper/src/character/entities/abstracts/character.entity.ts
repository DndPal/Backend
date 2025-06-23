import { Party } from "src/party/entities/party.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCharacterPayload } from "../types/create-character.type";
import { CharacterAttributes } from "../character-attributes.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";

@Entity('characters')
export class Character {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => User, (user) => user.characters, { nullable: false })
    @JoinColumn({ name: 'owner_user_id' })
    @Index('idx_characters_on_users')
    user: User

    @Column({ name: 'hit_points'})
    hitPoints: number

    @Column({ name: 'armor_class' })
    armorClass: number

    @OneToMany(() => Item, (item) => item.owner)
    inventory: Item[]

    @ManyToOne(() => Party, (party) => party.members, { onDelete: 'SET NULL' })
    @Index('idx_characters_on_parties')
    @JoinColumn()
    party: Party

    @OneToOne(() => Armor, { nullable: true })
    @JoinColumn()
    equipedArmor: Armor

    @OneToOne(() => Weapon, { nullable: true })
    @JoinColumn()
    equipedWeapon: Weapon

    constructor(payload?: CreateCharacterPayload) {
        this.hitPoints = payload?.hitPoints;
        this.armorClass = payload?.armorClass;
        this.user = payload?.user;
    }
}