import { Module, Provider } from "@nestjs/common";
import { DiceRollService } from "./services/dice-roll.service";
import { DiceDiTokens } from "./di/dice-tokens.di";
import { DiceRollUseCase } from "./services/usecases/dice-roll.usecase";
import { AbilityCheckService } from "./services/ability-check.service";

const serviceProviders: Array<Provider> =  [
    {
        provide: DiceDiTokens.DiceRollService,
        useFactory: () => new DiceRollService()
    },
    {
        provide: DiceDiTokens.AbilityCheckService,
        useFactory: (
            diceRollService: DiceRollUseCase
        ) => new AbilityCheckService(diceRollService),
        inject: [
            DiceDiTokens.DiceRollService
        ]
    }
];

@Module({
    providers: [
        ...serviceProviders
    ],
    exports: [
        DiceDiTokens.DiceRollService,
        DiceDiTokens.AbilityCheckService
    ]
})

export class DiceModule {}
