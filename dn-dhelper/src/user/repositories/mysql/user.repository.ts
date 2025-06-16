import { Repository } from "typeorm";
import { UserRepositoryInterface } from "../user-repository.interface";
import { User } from "src/user/entities/user.entity";

export class UserRepository implements UserRepositoryInterface {
    constructor(
        private readonly repository: Repository<User> 
    ) {}

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async findById(id: number): Promise<User> {
        return await this.repository.findOne({
            where: { id: id },
            relations: ['createdParty']
        });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({where: { username: username }});
    }

    async remove(user: User): Promise<void> {
        await this.repository.remove(user);
    }
}
