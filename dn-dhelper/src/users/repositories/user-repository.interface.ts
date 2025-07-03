import { User } from "../entities/user.entity";

export interface UserRepositoryInterface {
    save(user: User): Promise<void>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    remove(user: User): Promise<void>;
}
