import { Character } from "src/character/entities/character.entity"
import { UseCase } from "src/common/usecase.common"

export type FindCharacterByIdPort = {
    id: number
}

export interface FindCharacterByIdUseCase extends UseCase<FindCharacterByIdPort, Character> {}