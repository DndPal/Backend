import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";
import { UseCase } from "src/common/usecase.common";
import { AddNonPlayableCharacterToPartyResponseDto } from "src/party/dto/add-non-playable-character-to-party-response.dto";

export type AddNonPlayableCharacterToPartyPort = {
    dexterity: number;
    strength: number;
    intelligence: number;
    charisma: number;
    wisdom: number;
    constitution: number;
    hitPoints: number;
    armorClass: number;
    userId: number;
    partyId: number;
    name: string;
}

export interface AddNonPlayableCharacterToPartyUseCase extends UseCase<AddNonPlayableCharacterToPartyPort, AddNonPlayableCharacterToPartyResponseDto> {}
