import { FindSessionByIdUseCase } from "./usecases/find-session-by-id.usecase";
import { ValidateSessionPort, ValidateSessionUseCase } from "./usecases/validate-session.usecase";

export class ValidateSessionService implements ValidateSessionUseCase {
    constructor(
        private readonly findSessionByIdService: FindSessionByIdUseCase    
    ) {} 

    async execute(payload: ValidateSessionPort): Promise<string> {
        const session = await this.findSessionByIdService.execute(payload);

        if(!session || session.hasLoggedOut) {
            return null; 
        }

        return session.id;
    }
}