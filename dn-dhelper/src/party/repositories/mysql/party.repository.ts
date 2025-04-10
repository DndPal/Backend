import { Party } from "src/party/entities/party.entity";
import { PartyRepositoryInterface } from "../party-repository.interface";
import { Repository } from "typeorm";

export class PartyRepository implements PartyRepositoryInterface {
    constructor(
        private readonly repository: Repository<Party>
    ) {}

    async save(party: Party) {
        await this.repository.save(party);
    }

    async findById(id: number) {
        const party: Party = await this.repository.findOne({ where: { id: id } });
        return party;
    }

    async removeParty(party: Party) {
        await this.repository.remove(party);
    }
}