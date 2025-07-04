import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { AbilityCheckResponseDto } from "src/dice/dto/ability-check-response.dto";

export type InvokeAbilityCheckPort = {
    userId: number;
    characterId: number;
    characterAttribute: CharacterAttribute;
    difficultyClass: number;
    partyId: number;
}

export interface InvokeAbilityCheckUseCase extends UseCase<InvokeAbilityCheckPort, AbilityCheckResponseDto> {}
