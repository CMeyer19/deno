import {getUsers} from "../services/userService.ts";

export default async ({response}: { response: any }): Promise<void> => {
    response.body = await getUsers();
};