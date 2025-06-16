import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { DeletePartyPort, DeletePartyUseCase } from "./usecases/delete-party.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";

export class DeletePartyService implements DeletePartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase,
    ) {}

    async execute(payload: DeletePartyPort): Promise<void> {
        const { userId } = payload;
        const user = await this.findUserByIdService.execute({ id: userId });
        const party = user.createdParty;

        if(!user.createdParty) {
            throw new UnauthorizedException('User does not own a party');
        }

        await this.partyRepository.removeParty(party);
    }
}