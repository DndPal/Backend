import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Party } from "./party.entity";

@Entity('invitations')
export class Invitation {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @ManyToOne(() => User, (user) => user.invitations, { nullable: false })
    @JoinColumn()
    invitedUser: User
    
    @ManyToOne(() => Party, (party) => party.invitations, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn()
    partyInvitedTo: Party
}