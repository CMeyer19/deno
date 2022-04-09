import { updateUser } from "../services/userService.ts";

export default async ({ params, request, response }: { params: any, request: any, response: any }) => {
    const userId = params.id;

    if (!userId) {
        response.status = 400;
        response.body = { msg: "Invalid user ID" };
        return;
    }

    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data" };
        return;
    }

    const { firstName, lastName } = await request.body().value;

    await updateUser(userId, { firstName, lastName });

    response.body = { msg: "User updated" };
};