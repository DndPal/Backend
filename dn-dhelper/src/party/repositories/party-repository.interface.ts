import { Party } from "../entities/party.entity";

export interface PartyRepositoryInterface {
    save(party: Party): Promise<void>;
    findById(id: number): Promise<Party>;
    removeParty(party: Party): Promise<void>;
}