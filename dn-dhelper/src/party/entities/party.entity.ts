import { Character } from "src/character/entities/character.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('parties')
export class Party {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @OneToOne(() => User)
    @JoinColumn({ name: 'leader_id' })
    leader: User
    
    @OneToMany(() => Character, (character) => character.party)
    members: Character[]
}
