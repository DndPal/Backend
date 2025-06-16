import { UnauthorizedException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { FindUserByUsernamePort, FindUserByUsernameUseCase } from "./usecases/find-user-by-username.usecase";

export class FindByUsernameService implements FindUserByUsernameUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: FindUserByUsernamePort): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findByUsername(username);

        return user;
    }
}
