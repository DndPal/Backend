import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { RemoveUserPort, RemoveUserUseCase } from "./usecases/remove-user.usecase";

export class RemoveUserService implements RemoveUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: RemoveUserPort): Promise<void> {
        const { userId, userToDeleteId } = payload;

        const user: User = await this.userRepository.findById(userId);
        if(!user) throw new NotFoundException();

        const userToDelete: User = await this.userRepository.findById(userToDeleteId);
        if(!userToDelete) throw new NotFoundException();

        if(user.id !== userToDelete.id) throw new ForbiddenException(); 

        await this.userRepository.remove(user);
    }
}
