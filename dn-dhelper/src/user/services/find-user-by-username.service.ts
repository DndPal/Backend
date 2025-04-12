import { UnauthorizedException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { FindByUsernamePort, FindByUsernameUseCase } from "./usecases/find-by-username.usecase";

export class FindByUsernameService implements FindByUsernameUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: FindByUsernamePort): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findByUsername(username);
        
        if(!user) {
            throw new UnauthorizedException('User does not exist');
        }

        return user;
    }
}
