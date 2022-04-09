import {getUsers} from "../services/userService.ts";

export default async ({response}) => {
    response.body = await getUsers();
};