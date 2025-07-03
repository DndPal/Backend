import { UseCase } from "src/common/usecase.common";
import { AttackCharacterResponseDto } from "src/party/dto/attack-character-response.dto";

export type AttackCharacterPort = {
    userId: number;
    attackingCharacterId: number;
    defendingCharacterId: number;
    partyId: number;
}

export interface AttackCharacterUseCase extends UseCase<AttackCharacterPort, AttackCharacterResponseDto> {}
