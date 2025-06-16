import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";

export type GiveItemToCharacterPort = {
    itemPresetId: number;
    characterId: number;
    userId: number;
}

export interface GiveItemToCharacterUseCase extends UseCase<GiveItemToCharacterPort, void> {}