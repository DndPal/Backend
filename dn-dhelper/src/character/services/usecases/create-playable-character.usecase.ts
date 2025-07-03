import { CreatePlayableCharacterResponseDto } from "src/character/dto/create-playable-character-response.dto";
import { UseCase } from "src/common/usecase.common";

export type CreatePlayableCharacterPort= {
    userId: number;
    dexterity: number;
    strength: number;
    intelligence: number;
    charisma: number;
    wisdom: number;
    constitution: number;
    hitPoints: number;
    armorClass: number;
    name: string;
}

export interface CreatePlayableCharacterUseCase extends UseCase<CreatePlayableCharacterPort, CreatePlayableCharacterResponseDto> {}
