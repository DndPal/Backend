import { Party } from "src/party/entities/party.entity";
import { PartyRepositoryInterface } from "../party-repository.interface";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";

export class PartyRepository implements PartyRepositoryInterface {
    constructor(
        private readonly repository: Repository<Party>
    ) {}

    async save(party: Party) {
        await this.repository.save(party);
    }

    async findById(id: number) {
        return await this.repository.findOne({ where: { id: id } }); 
    }

    async removeParty(party: Party) {
        await this.repository.remove(party);
    }

    async findByLeader(user: User) {
        const party: Party = await this.repository.findOne({ 
            where: { leader: user },
            relations: ['members'],
        });
        return party;
    }
}