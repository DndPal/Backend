import { SessionRepositoryInterface } from "../session-repository.interface";
import { Repository } from "typeorm";
import { Session } from "src/authentication/entities/session.entity";

export class SessionRepository implements SessionRepositoryInterface {
    constructor(
        private readonly repository: Repository<Session>
    ) {};

    async save(session: Session): Promise<void> {
        await this.repository.save(session);
    }

    async findById(id: string): Promise<Session> {
        return await this.repository.findOne({ 
            where: { id: id },
            relations: ['user'] 
        });
    }

    async updateLogOutState(id: string, newLogOutState: boolean): Promise<void> {
        await this.repository.update(id, { hasLoggedOut: newLogOutState });
    }

    async findValidSessionByUserId(userId: number): Promise<Session> {
        return await this.repository.findOne({
            where: {
                user: { id: userId },
                hasLoggedOut: false
            }
        })
    }
}
