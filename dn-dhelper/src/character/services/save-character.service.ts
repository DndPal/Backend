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

    async execute(payload: SaveCharacterPort) {
        const { sessionId, int, dex, str, cha, wis, con } = payload;
        const user = await this.findUserBySessionIdService.execute({ sessionId: sessionId });
        console.log(user);

        let character = new Character();
        character.dex = dex;
        character.str = str;
        character.cha = cha;
        character.wis = wis;
        character.con = con;
        character.int = int;
        character.user = user;
        await this.characterRepository.save(character);
    }
}