import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { KickCharacterPort, KickCharacterUseCase } from "./usecases/kick-character.usecase";
import { FindUserBySessionIdUseCase } from "src/authentication/services/usecases/find-user-by-session-id.usecase";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";

export class KickCharacterService implements KickCharacterUseCase {
    constructor(
        private readonly removePartyFromCharacterService: RemovePartyFromCharacterUseCase,
        private readonly findUserBySessionIdService: FindUserBySessionIdUseCase,
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly findCharacterByIdService: FindCharacterByIdUseCase
    ) {}

    async execute(payload: KickCharacterPort): Promise<void> {
        const { characterId, sessionId } = payload;
        const user = await this.findUserBySessionIdService.execute({ sessionId: sessionId });
        const party = await this.partyRepository.findByLeader(user);
        const character = await this.findCharacterByIdService.execute({ id: characterId })

        if(!party.members.includes(character)) {
            throw new UnauthorizedException();
        }

        await this.removePartyFromCharacterService.execute({ character: character });
    } 
}