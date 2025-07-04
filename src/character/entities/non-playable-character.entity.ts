import { ChildEntity } from "typeorm";
import { Character } from "./abstracts/character.abstract";
import { User } from "src/users/entities/user.entity";
import { CreateNonPlayableCharacterPayload } from "../types/Create-non-playable-character-payload.type";

@ChildEntity('non_playable_character')
export class NonPlayableCharacter extends Character {
    UserHasOwnership(user: User): boolean {
        return this.party.id == user.createdParty?.id;
    }

    constructor(payload?: CreateNonPlayableCharacterPayload) {
        super();
        this.party = payload?.party;
        this.name = payload?.name;
    }
}

