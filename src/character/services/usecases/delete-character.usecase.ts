import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";

export type DeleteCharacterPort = {
    character: Character;
}

export interface DeleteCharacterUseCase extends UseCase<DeleteCharacterPort, void> {}
