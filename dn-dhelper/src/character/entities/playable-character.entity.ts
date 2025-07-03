import { ChildEntity } from "typeorm";
import { Character } from "./abstracts/character.abstract";
import { User } from "src/users/entities/user.entity";
import { CreatePlayableCharacterPayload } from "../types/create-playable-character-payload.type";

@ChildEntity('playable_character')
export class PlayableCharacter extends Character {
    UserHasOwnership(user: User): boolean {
        return this.user.id == user.id;
    }

    constructor(payload?: CreatePlayableCharacterPayload) {
        super();
        this.user = payload?.user;
        this.name = payload?.name;
    }
}
