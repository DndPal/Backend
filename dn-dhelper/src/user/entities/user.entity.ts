import { Character } from "src/character/entities/character.entity";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";
import { Invitation } from "src/party/entities/invitation.entity";
import { Party } from "src/party/entities/party.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "password" })
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => Character, (character) => character.user)
    characters: Character[];

    @OneToMany(() => Invitation, (invitation) => invitation.invitedUser)
    invitations: Invitation[];

    @OneToOne(() => Party, (party) => party.leader, { onDelete: 'SET NULL' })
    @JoinColumn()
    createdParty: Party

    @OneToMany(() => ItemPreset, (itemPreset) => itemPreset.creator)
    itemPresets: ItemPreset[]; 
}
