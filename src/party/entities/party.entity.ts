import { Character } from "src/character/entities/abstracts/character.abstract";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invitation } from "./invitation.entity";

@Entity('parties')
export class Party {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToOne(() => User, (user) => user.createdParty, { nullable: false })
    leader: User;
    
    @OneToMany(() => Character, (character) => character.party)
    members: Character[];

    @OneToMany(() => Invitation, (invitation) => invitation.partyInvitedTo)
    invitations: Invitation[];

    @Column({ name: 'character_slots' })
    characterSlots: number;
}
