import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { FindByIdUseCase } from "./usecases/find-by-id.usecase";

export class FindByIdService implements FindByIdUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: number): Promise<User> {
        return await this.userRepository.findById(payload);
    }
}
