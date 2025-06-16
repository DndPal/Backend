import { Module, Provider } from "@nestjs/common";
import { DiceRollService } from "./services/dice-roll.service";
import { DiceDiTokens } from "./di/dice-tokens.di";

const serviceProviders: Array<Provider> =  [
    {
        provide: DiceDiTokens.DiceRollService,
        useFactory: () => new DiceRollService()
    }
];

@Module({
    providers: [
        ...serviceProviders
    ],
})

export class DiceModule {}