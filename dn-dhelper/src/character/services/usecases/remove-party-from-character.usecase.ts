import { Character } from "src/character/entities/character.entity";
import { UseCase } from "src/common/usecase.common";

export type RemovePartyFromCharacterPort = {
    character: Character
}

export interface RemovePartyFromCharacterUseCase extends UseCase<RemovePartyFromCharacterPort, void> {}