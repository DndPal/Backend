import { Character } from "src/character/entities/character.entity";
import { CharacterRepositoryInterface } from "../character-repository.interface";
import { Repository } from "typeorm";

export class CharacterRepository implements CharacterRepositoryInterface {
    constructor(
        private readonly repository: Repository<Character>
    ) {}
    
    async save(character: Character): Promise<void> {
        await this.repository.save(character);
    }

    async findById(id: number): Promise<Character> {
        const character = await this.repository.findOne({ where: { id: id }});
        return character;
    }

    async remove(character: Character): Promise<void> {
        await this.repository.remove(character);
    }

    async update(id: number, statName: string, newValue: number) {
        await this.repository.update(id, { [statName]: newValue });
    }
}