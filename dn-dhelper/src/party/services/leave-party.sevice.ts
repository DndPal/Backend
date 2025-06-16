import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { LeavePartyUseCase, LeavePartyPort } from "./usecases/leave-party.usecase";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { UnauthorizedException } from "@nestjs/common";

export class LeavePartyService implements LeavePartyUseCase {
    constructor(
        private readonly removePartyFromCharacterService: RemovePartyFromCharacterUseCase,
        private readonly findCharacterByIdService: FindCharacterByIdUseCase,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: LeavePartyPort) {
        const { userId, characterId } = payload;
        
        const character = await this.findCharacterByIdService.execute({ id: characterId });
        const user = await this.findUserByIdService.execute({ id: userId });

        if(character.user != user) {
            throw new UnauthorizedException('Character does not belong to this user')
        }

        await this.removePartyFromCharacterService.execute({ character: character });
        

    }
}