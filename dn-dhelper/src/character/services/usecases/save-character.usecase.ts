import { UseCase } from "src/common/usecase.common";

export type SaveCharacterPort= {
    sessionId: string,
    dex: number,
    str: number,
    int: number,
    cha: number,
    wis: number,
    con: number,
    hp: number,
    ac: number
}

export interface SaveCharacterUseCase extends UseCase<SaveCharacterPort, void> {}