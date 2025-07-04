import { UseCase } from "src/common/usecase.common";
import { Party } from "src/party/entities/party.entity";

export type GetPartyByPartyIdPort = {
    userId: number;
    partyId: number;
}

export interface GetPartyByPartyIdUseCase extends UseCase<GetPartyByPartyIdPort, Party> {} 
