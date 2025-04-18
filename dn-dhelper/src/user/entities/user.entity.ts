import { Character } from "src/character/entities/character.entity";
import { Party } from "src/party/entities/party.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
