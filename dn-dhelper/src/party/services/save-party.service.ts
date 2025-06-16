import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { SavePartyPort, SavePartyUseCase } from "./usecases/save-party.usecase";
import { User } from "src/user/entities/user.entity";
import { UnauthorizedException } from "@nestjs/common";

export class SavePartyService implements SavePartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: SavePartyPort) {
        const { characterSlots, userId } = payload;
        const user = await this.findUserByIdService.execute({ id: userId });

        if(user.createdParty) {
            throw new UnauthorizedException('User already owns a party')
        }

        let party = new Party();
        party.characterSlots = characterSlots;
        party.leader = { id: userId } as User;

        await this.partyRepository.save(party);
    }
}