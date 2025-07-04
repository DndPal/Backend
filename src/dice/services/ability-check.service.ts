import { DiceRollUseCase } from "./usecases/dice-roll.usecase";
import { AbilityCheckPort, AbilityCheckUseCase } from "./usecases/ability-check.usecase";
import { AbilityCheckResponseDto } from "../dto/ability-check-response.dto";

export class AbilityCheckService implements AbilityCheckUseCase {
    constructor(
        private readonly diceRollService: DiceRollUseCase
    ) {};

    async execute(payload: AbilityCheckPort): Promise<AbilityCheckResponseDto> {
        const { characterAttribute, character, difficultyClass } = payload;

        const diceRollResult = await this.diceRollService.execute({ dice: '1d20' });

        const fullResult = diceRollResult + Math.round(character.characterAttributes[characterAttribute] / 3);

        const abilityCheckSucceded = fullResult >= difficultyClass;

        return {
            difficultyClass: difficultyClass,
            rolledResult: fullResult,
            abilityCheckSucceded: abilityCheckSucceded
        }
    }
}
