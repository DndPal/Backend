import { UseCase } from "src/common/usecase.common";
import { Dice } from "../../types/dice.type";

export type DiceRollPort = {
    dice: Dice
}

export interface DiceRollUseCase extends UseCase<DiceRollPort, number> {}
