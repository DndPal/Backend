import { Character } from "src/character/entities/abstracts/character.abstract";
import { CharacterRepositoryInterface } from "../character-repository.interface";
import { Repository } from "typeorm";
import { CharacterType } from "src/character/types/enums/character-type.enum";
import { PlayableCharacter } from "src/character/entities/playable-character.entity";
import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";

export class CharacterRepository implements CharacterRepositoryInterface {
    constructor(
        private readonly repository: Repository<Character>
    ) {}
    
    async save(character: Character): Promise<void> {
        await this.repository.save(character);
    }

    async findById(id: number): Promise<Character> {
        const character: Character = await this.repository.findOne({ 
            where: { 
                id: id 
            },
            relations: [
                'party',
                'user',
                'characterAttributes',
                'inventory',
                'equippedWeapon',
                'equippedArmor'         
            ]
        });

        return character;
    }

    async findPlayableCharacterById(id: number): Promise<PlayableCharacter> {
        const character: Character = await this.repository.findOne({
            where: {
                id: id,
                character_type: CharacterType.Playable
            },
            relations: [
                'party',
                'user',
                'equippedArmor',
                'equippedWeapon',
                'inventory',
                'characterAttributes'
            ]
        });

        return character as PlayableCharacter | null;
    }

    async findNonPlayableCharacterById(id: number): Promise<NonPlayableCharacter> {
        const character: Character = await this.repository.findOne({
            where: {
                id: id,
                character_type: CharacterType.NonPlayable
            },
            relations: [
                'party'
            ]
        });

        return character as NonPlayableCharacter | null;
    }

    async findPlayableCharactersByUserId(userId: number): Promise<PlayableCharacter[]> {
        return await this.repository.find({
            where: {
                user: { id: userId },
            },
            relations: [
                'equippedArmor',
                'equippedWeapon',
                'inventory',
                'characterAttributes'
            ]
        }); 
    }

    async remove(character: Character): Promise<void> {
        await this.repository.remove(character);
    }
}
