import userRepo from "../repositories/userRepo.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts"

export const getUsers = async () => {
    const users = await userRepo.selectAll();

    const result = [];

    users.rows.map((user: UserInterface) => {
        const obj = {};

        users.rowDescription.columns.map((el: UserInterface, i) => {
            obj[el.firstName] = user[i];
        });

        result.push(obj);
    });

    return result;
};

export const getUser = async (userId: number) => {
    const users = await userRepo.selectById(userId);

    let result = {};
    users.rows.map((user) => {
        result = user;
    });

    return result;
};

export const createUser = async (userData) => {
    const newUser: UserInterface = {
        firstName: String(userData.firstName),
        lastName: String(userData.lastName)
    };

    await userRepo.create(newUser);

    return newUser.id;
};

export const updateUser = async (userId, userData) => {
    const user = await getUser(userId);

    if (Object.keys(user).length === 0 && user.constructor === Object) {
        throw new Error("User not found");
    }

    const updatedUser: UserInterface = {
        firstName: userData.firstName !== undefined ? String(userData.firstName) : user.firstName,
        lastName: userData.lastName !== undefined ? String(userData.lastName) : user.lastName,
    };

    userRepo.update(userId, updatedUser);
};

export const deleteUser = async (userId) => {
    userRepo.delete(userId);
};