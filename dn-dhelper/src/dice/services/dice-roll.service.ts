import { Dice } from "../types/dice.type";
import { DiceRollPort, DiceRollUseCase } from "./usecases/dice-roll.usecase";

export class DiceRollService implements DiceRollUseCase {
    constructor(
        private readonly minValue = 1
    ) {}

    async execute(payload: DiceRollPort): Promise<number> {
        const { dice } = payload;
        let result: number = 0;
        
        const [rollCount, diceSidesCount] = await this.determineRollCountAndDiceSides(dice);

        for (let i = 0; i < rollCount; i++) {
            result = result + Math.floor(Math.random() * (diceSidesCount - this.minValue + 1)) + this.minValue;
        }

        return result;
    }
    
    private determineRollCountAndDiceSides(dice: Dice): Array<number> {
        const diceCountAndSides: Array<number> = dice.split('d').map(Number);

        return diceCountAndSides;
    }
}
