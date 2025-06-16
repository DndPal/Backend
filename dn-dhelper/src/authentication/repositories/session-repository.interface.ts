import { User } from "src/user/entities/user.entity";
import { Session } from "../entities/session.entity";

export interface SessionRepositoryInterface {
    save(session: Session): Promise<void>;
    findSessionById(id: string): Promise<Session>;
    updateLogOutState(id: string, newLogOutState: boolean): Promise<void>;
} 