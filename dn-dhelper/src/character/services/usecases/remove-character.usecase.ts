import { Character } from "src/character/entities/character.entity";
import { UseCase } from "src/common/usecase.common";

export type RemoveCharacterPort = {
    id: number
}

export interface RemoveCharacterUseCase extends UseCase<RemoveCharacterPort, void> {}