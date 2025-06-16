import { User } from "src/user/entities/user.entity";
import { Character } from "../character.entity";

export type CreateCharacterPayload = {
    character?: Character,
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