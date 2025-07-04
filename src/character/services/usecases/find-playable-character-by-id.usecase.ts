import { PlayableCharacter } from "src/character/entities/playable-character.entity";
import { UseCase } from "src/common/usecase.common";

export type FindPlayableCharacterByIdPort = {
    id: number;
}

export interface FindPlayableCharacterByIdUseCase extends UseCase<FindPlayableCharacterByIdPort, PlayableCharacter> {}
