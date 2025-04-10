import { User } from "src/user/entities/user.entity";
import { Character } from "../entities/character.entity";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { SaveCharacterPort, SaveCharacterUseCase } from "./usecases/save-character.usecase";
import { FindUserBySessionIdUseCase } from "src/authentication/services/usecases/find-user-by-session-id.usecase";

export class SaveCharacterService implements SaveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly findUserBySessionIdService: FindUserBySessionIdUseCase
    ) {}

    async execute(payload: SaveCharacterPort): Promise<void> {
        const { 
            sessionId,
            intelligence, 
            dexterity, 
            strength, 
            charisma, 
            wisdom, 
            constitution, 
            hitPoints, 
            armorClass 
        } = payload;

        const user = await this.findUserBySessionIdService.execute({ sessionId: sessionId });

        const character = new Character({
            intelligence: intelligence,
            strength: strength,
            constitution: constitution,
            charisma: charisma,
            wisdom: wisdom,
            dexterity: dexterity,
            hitPoints: hitPoints,
            armorClass: armorClass,
            user: user
        });
        
        await this.characterRepository.save(character);
    }
}