import { Session } from "../entities/session.entity";

export interface SessionRepositoryInterface {
    save(session: Session): Promise<void>;
    findById(id: string): Promise<Session>;
    updateLogOutState(id: string, newLogOutState: boolean): Promise<void>;
    findValidSessionByUserId(userId: number): Promise<Session>;
} 
