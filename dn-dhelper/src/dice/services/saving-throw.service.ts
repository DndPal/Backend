import { DiceRollUseCase } from "./usecases/dice-roll.usecase";
import { AbilityCheckPort, AbilityCheckUseCase } from "./usecases/saving-throw.usecase";

export class AbilityCheckService implements AbilityCheckUseCase {
    constructor(
        private readonly diceRollService: DiceRollUseCase
    ) {};

    async execute(payload: AbilityCheckPort): Promise<boolean> {
        const { dice, characterAttribute, characterAttributes, difficultyClass } = payload;

        const rawResult = await this.diceRollService.execute({ dice: dice });

        const fullResult = rawResult + Math.round(characterAttributes[characterAttribute] / 3);

        return fullResult >= difficultyClass;
    }
}

