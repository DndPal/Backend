import { User } from "src/user/entities/user.entity";

export type CreateCharacterPayload = {
    user?: User,
    strength?: number,
    intelligence?: number,
    dexterity?: number,
    wisdom?: number,
    constitution?: number,
    hitPoints?: number,
    armorClass?: number,
    charisma?: number
}