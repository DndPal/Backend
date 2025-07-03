import { Party } from "../entities/party.entity";

export interface PartyRepositoryInterface {
    save(party: Party): Promise<void>;
    findById(id: number): Promise<Party>;
    remove(party: Party): Promise<void>;
    findByIdWithCharacterRelations(id: number): Promise<Party>;
}
