import { UseCase } from "src/common/usecase.common";

export type RemovePartyFromCharacterPort = {
    characterId: number
}

export interface RemovePartyrFromCharacterUseCase extends UseCase<RemovePartyFromCharacterPort, void> {}