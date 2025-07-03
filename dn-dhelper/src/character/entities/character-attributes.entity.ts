import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./abstracts/character.abstract";
import { CreateCharacterAttributesPayload } from "../types/create-character-attributes.type";

@Entity('character_attributes')
export class CharacterAttributes {
    @PrimaryGeneratedColumn({ name: 'attributeId' })
    attributeId: number;

    @OneToOne(() => Character, (character) => character.characterAttributes, { onDelete: 'CASCADE' })
    @JoinColumn()
    character: Character;

    @Column({ name: 'dexterity', default: 1 })
    dexterity: number;

    @Column({ name: 'strength', default: 1 })
    strength: number;

    @Column({ name: 'intelligence', default: 1 })
    intelligence: number;

    @Column({ name: 'charisma', default: 1 })
    charisma: number;

    @Column({ name: 'wisdom', default: 1 })
    wisdom: number;

    @Column({ name: 'constitution', default: 1 })
    constitution: number;

    @Column({ name: 'hit_points', default: 20 })
    hitPoints: number;

    @Column({ name: 'armor_class', default: 10 })
    armorClass: number;
        
    constructor(payload?: CreateCharacterAttributesPayload) {
        this.dexterity = payload?.dexterity;
        this.intelligence = payload?.intelligence;
        this.wisdom = payload?.wisdom;
        this.charisma = payload?.charisma;
        this.strength = payload?.strength;
        this.constitution = payload?.constitution;
        this.hitPoints = payload?.hitPoints;
        this.armorClass = payload?.armorClass;
        this.character = payload?.character;
    }
}
