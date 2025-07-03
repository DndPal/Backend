import { Party } from "src/party/entities/party.entity";
import { PartyRepositoryInterface } from "../party-repository.interface";
import { Repository } from "typeorm";

export class PartyRepository implements PartyRepositoryInterface {
    constructor(
        private readonly repository: Repository<Party>
    ) {}

    async save(party: Party): Promise<void> {
        await this.repository.save(party);
    }

    async findById(id: number): Promise<Party> {
        return await this.repository.findOne({ 
            where: { id: id },
            relations: [
                'members',
                'leader'
            ]
         }); 
    }

    async remove(party: Party): Promise<void> {
        await this.repository.remove(party);
    }
 
    async findByIdWithCharacterRelations(id: number): Promise<Party> {
        return await this.repository.findOne({
            where: { id: id },
            relations: [
                'members',
                'members.inventory',
                'members.user',
                'members.equippedWeapon',
                'members.equippedArmor',
                'members.characterAttributes',
                'members.party',
                'leader'
            ]
        });
    }
}
