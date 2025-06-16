import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { KickCharacterPort, KickCharacterUseCase } from "./usecases/kick-character.usecase";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";

export class KickCharacterService implements KickCharacterUseCase {
    constructor(
        private readonly removePartyFromCharacterService: RemovePartyFromCharacterUseCase,
        private readonly findCharacterByIdService: FindCharacterByIdUseCase,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: KickCharacterPort): Promise<void> {
        const { characterId, userId } = payload;

        const user = await this.findUserByIdService.execute({ id: userId });
        if(!user.createdParty) throw new UnauthorizedException('Party does not exist')

        const character = await this.findCharacterByIdService.execute({ id: characterId });
        if(user.createdParty.id != character.party.id) {
            throw new UnauthorizedException('Character does not exist in this party');
        }

        await this.removePartyFromCharacterService.execute({ character: character });
    } 
}