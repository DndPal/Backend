import { PlayableCharacter } from "src/character/entities/playable-character.entity";
import { UseCase } from "src/common/usecase.common";

export type FindPlayableCharactersByUserIdPort = {
    userId: number;
}
 
export interface FindPlayableCharactersByUserIdUseCase extends UseCase<FindPlayableCharactersByUserIdPort, PlayableCharacter[]> {}
