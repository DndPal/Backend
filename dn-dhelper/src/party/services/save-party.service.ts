import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { SavePartyPort, SavePartyUseCase } from "./usecases/save-party.usecase";

export class SavePartyService implements SavePartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: SavePartyPort) {
        const { user } = payload;
        let party = new Party();
        party.leader = user;
        await this.partyRepository.save(party)
    }
}