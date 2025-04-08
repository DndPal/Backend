import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('characters')
export class Character {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => User, (user) => user.characters)
    @JoinColumn({ name: 'owner_user_id' })
    user: User

    @Column({ name: 'dexterity' })
    dex: number;

    @Column({ name: 'strenght' })
    str: number;

    @Column({ name: 'intelligence' })
    int: number;

    @Column({ name: 'charisma' })
    cha: number;

    @Column({ name: 'wisdom' })
    wis: number;

    @Column({ name: 'constitution' })
    con: number;

}