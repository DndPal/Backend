import { Party } from "src/party/entities/party.entity";

export type CreateNonPlayableCharacterPayload = {
    party?: Party;
    name?: string;
}
