import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./abstracts/character.entity";
import { CreateCharacterPayload } from "./types/create-character.type";

@Entity('character_attributes')
export class CharacterAttributes {
    @PrimaryGeneratedColumn({ name: 'attributeId' })
    attributeId: number;

    @OneToOne(() => Character, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn()
    character: Character

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
        
    constructor(payload?: CreateCharacterPayload) {
        this.character = payload?.character;
        this.dexterity = payload?.dexterity;
        this.intelligence = payload?.intelligence;
        this.wisdom = payload?.wisdom;
        this.charisma = payload?.charisma;
        this.strength = payload?.strength;
        this.constitution = payload?.constitution;
    }
}