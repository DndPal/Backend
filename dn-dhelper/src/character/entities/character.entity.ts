import { Party } from "src/party/entities/party.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCharacterPayload } from "./types/create-character.type";

@Entity('characters')
export class Character {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => User, (user) => user.characters)
    @JoinColumn({ name: 'owner_user_id' })
    @Index('idx_characters_on_users')
    user: User

    @Column({ name: 'hit_points'})
    hitPoints: number

    @Column({ name: 'armor_class' })
    armorClass: number

    @Column({ name: 'dexterity' })
    dexterity: number

    @Column({ name: 'strength' })
    strength: number

    @Column({ name: 'intelligence' })
    intelligence: number

    @Column({ name: 'charisma' })
    charisma: number

    @Column({ name: 'wisdom' })
    wisdom: number

    @Column({ name: 'constitution' })
    constitution: number

    @ManyToOne(() => Party, (party) => party.members)
    @Index('idx_characters_on_parties')
    party: Party

    constructor(payload?: CreateCharacterPayload) {
        this.hitPoints = payload?.hitPoints;
        this.armorClass = payload?.armorClass;
        this.dexterity = payload?.dexterity;
        this.intelligence = payload?.intelligence;
        this.wisdom = payload?.wisdom;
        this.charisma = payload?.charisma;
        this.strength = payload?.strength;
        this.constitution = payload?.constitution;
        this.user = payload?.user;
    }

}