import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { ValidateSessionUseCase } from "../services/usecases/validate-session.usecase";
import { UnauthorizedException } from "@nestjs/common";

export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
    constructor(
        private readonly validateSessionService: ValidateSessionUseCase
    ) {
        super()
    }

    async validate(req: any): Promise<string> {
        const id = req.body['sessionId'];
        const sessionId = await this.validateSessionService.execute({ sessionId: id });

        if(!sessionId) {
            throw new UnauthorizedException();
        }

        return sessionId;
    }
}