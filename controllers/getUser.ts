import {getUser} from "../services/userService.ts";

export default async ({params, response}: { params: any; response: any }) => {
    const userId = params.id;

    if (!userId) {
        response.status = 400;
        response.body = {msg: "Invalid beer id"};
        return;
    }

    const foundUser = await getUser(userId);
    if (!foundUser) {
        response.status = 404;
        response.body = {msg: `User with ID ${userId} not found`};
        return;
    }

    response.body = foundUser;
};