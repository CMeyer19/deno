import {deleteUser, getUser} from "../services/userService.ts";
import {Context} from "../deps.ts";
import {IdentifierType} from "../abstractions/types/identifier.type.ts";

interface ContextWithParams extends Context {
    params: { id: string; };
}

export default async ({params, response}: ContextWithParams) => {
    const userId: IdentifierType = params.id;

    if (!userId) {
        response.status = 400;
        response.body = {msg: "Invalid user ID"};
        return;
    }

    const foundUser = await getUser(userId);
    if (!foundUser) {
        response.status = 404;
        response.body = {msg: `User with ID ${userId} not found`};
        return;
    }

    await deleteUser(userId);
    response.body = {msg: "User deleted"};
};