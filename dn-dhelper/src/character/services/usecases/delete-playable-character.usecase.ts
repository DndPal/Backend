import { UseCase } from "src/common/usecase.common";

export type DeletePlayableCharacterPort = {
    characterId: number;
    userId: number;
}

export interface DeletePlayableCharacterUseCase extends UseCase<DeletePlayableCharacterPort, void> {}
