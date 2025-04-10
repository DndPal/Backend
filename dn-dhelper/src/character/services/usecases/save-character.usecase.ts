import { UseCase } from "src/common/usecase.common";

export type SaveCharacterPort= {
    sessionId: string,
    dexterity: number,
    strength: number,
    intelligence: number,
    charisma: number,
    wisdom: number,
    constitution: number,
    hitPoints: number,
    armorClass: number
}

export interface SaveCharacterUseCase extends UseCase<SaveCharacterPort, void> {}