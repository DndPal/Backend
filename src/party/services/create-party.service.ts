import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { CreatePartyPort, CreatePartyUseCase } from "./usecases/create-party.usecase";
import { User } from "src/users/entities/user.entity";
import { ForbiddenException } from "@nestjs/common";

export class CreatePartyService implements CreatePartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: CreatePartyPort): Promise<Party> {
        const { characterSlots, userId } = payload;

        const user: User = await this.findUserByIdService.execute({ id: userId });

        if(user.createdParty) throw new ForbiddenException();

        let party = new Party();
        party.characterSlots = characterSlots;
        party.leader = user;

        await this.partyRepository.save(party);

        return party;
    }
}
