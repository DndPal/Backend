import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ValidateUserUseCase } from "../services/usecases/validate-user.usecase";
import { UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly validateUserService: ValidateUserUseCase
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<string> {
        const user = await this.validateUserService.execute({ username: username, password: password });

        if(!user) {
            throw new UnauthorizedException('Incorrect username or password');
        }        

        return user;
    }
}