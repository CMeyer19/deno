import {createUser} from "../services/userService.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts";

export default async ({request, response}: { request: any; response: any }) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = {msg: "Invalid user data"};
        return;
    }

    const {firstName, lastName}: Partial<UserInterface> = await request.body().value;

    console.log(await request.body({type: "json"}).value);
    console.log(firstName, lastName);

    if (!firstName || !lastName) {
        response.status = 422;
        response.body = {msg: "Incorrect user data. First name and last name are required"};
        return;
    }

    const userId = await createUser({firstName, lastName});

    response.body = {msg: "User created", userId};
};