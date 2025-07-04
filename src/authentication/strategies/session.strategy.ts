import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { ValidateSessionUseCase } from "../services/usecases/validate-session.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
    constructor(
        private readonly validateSessionService: ValidateSessionUseCase
    ) {
        super()
    }

    async validate(req: any): Promise<User> {
        const id = req.headers['authorization'];
        const user: User = await this.validateSessionService.execute({ sessionId: id });

        if(!user) throw new UnauthorizedException();
        
        return user;
    }
}
