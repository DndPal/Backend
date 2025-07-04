import { User } from "src/users/entities/user.entity";

export type CreatePlayableCharacterPayload = {
    user?: User;
    name?: string;
}
