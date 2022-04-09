import userRepo from "../repositories/userRepo.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts"
import {IdentifierType} from "../abstractions/types/identifier.type.ts";
import {QueryObjectResult} from "https://deno.land/x/postgres@v0.15.0/query/query.ts";

export const getUsers = async () => {
    const users = await userRepo.selectAll();

    const result: UserInterface[] = [];
    if (!users) return;

    users.rows.map((user: any) => {
        const obj: { [key: string]: any } = {};

        users?.rowDescription?.columns?.map((el: { name: string }, i: number) => {
            obj[el.name] = user[i];
        });

        if (!obj) return;

        result.push(obj as UserInterface);
    });

    return result;
};

export const getUser = async (userId: IdentifierType): Promise<UserInterface> => {
    const users = await userRepo.selectById(userId);

    let result: UserInterface = {firstName: "", lastName: ""};
    users.rows.map((user: UserInterface) => {
        result = user;
    });

    return result;
};

export const createUser = async (userData: UserInterface) => {
    const newUser: UserInterface = {
        firstName: String(userData.firstName),
        lastName: String(userData.lastName)
    };

    const result: QueryObjectResult<any> = await userRepo.create(newUser);
    const id: IdentifierType = result.rows[0].id;
    return id;
};

export const updateUser = async (userId: IdentifierType, userData: UserInterface): Promise<void> => {
    const user: UserInterface = await getUser(userId);

    if (Object.keys(user).length === 0 && user.constructor === Object) {
        throw new Error("User not found");
    }

    const updatedUser: UserInterface = {
        firstName: userData.firstName !== undefined ? String(userData.firstName) : user.firstName,
        lastName: userData.lastName !== undefined ? String(userData.lastName) : user.lastName,
    };

    await userRepo.update(userId, updatedUser);
};

export const deleteUser = (userId: IdentifierType) => {
    userRepo.delete(userId);
};