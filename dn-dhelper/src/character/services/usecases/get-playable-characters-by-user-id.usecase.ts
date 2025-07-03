import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";

export type GetPlayableCharactersByUserIdPort = {
    userId: number;
}

export interface GetPlayableCharactersByUserIdUseCase extends UseCase<GetPlayableCharactersByUserIdPort, Character[]> {}
