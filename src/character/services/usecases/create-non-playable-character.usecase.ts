import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";
import { UseCase } from "src/common/usecase.common";
import { AddNonPlayableCharacterToPartyResponseDto } from "src/party/dto/add-non-playable-character-to-party-response.dto";
import { Party } from "src/party/entities/party.entity";

export type CreateNonPlayableCharacterPort = {
    party: Party;
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

export interface CreateNonPlayableCharacterUseCase extends UseCase<CreateNonPlayableCharacterPort, AddNonPlayableCharacterToPartyResponseDto> {}
