import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";
import { RegisterUserPort, RegisterUserUseCase } from "./usecases/register-user.usecase";
import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";
import { BadRequestException } from "@nestjs/common";

export class RegisterUserService implements RegisterUserUseCase {
    constructor(
        private readonly saveUserService: SaveUserUseCase,
        private readonly findByUsername: FindByUsernameUseCase
    ) {}

    async execute(payload: RegisterUserPort): Promise<void> {
        const { username } = payload;
        const existingUser = await this.findByUsername.execute({ username: username });

        if(existingUser) {
            throw new BadRequestException('Username already exists');
        }

        await this.saveUserService.execute(payload);
    }


}