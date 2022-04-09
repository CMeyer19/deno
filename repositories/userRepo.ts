import client from "../db/database.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts"

class UserRepo {
    create(user: UserInterface) {
        return client?.queryObject(
            `INSERT INTO users (firstName, lastName) VALUES (${user.firstName}, ${user.lastName})`
        );
    }

    selectAll() {
        return client?.queryArray("SELECT * FROM users ORDER BY id");
    }

    selectById(id: number): Promise<any> | undefined {
        return client?.queryObject(`SELECT * FROM users WHERE id = ${id}`);
    }

     async update(id: number, user: UserInterface) {
        const latestUser: UserInterface = await this.selectById(id);
        const query = `UPDATE users SET firstName = ${user.firstName !== undefined ? user.firstName : latestUser.firstName}, lastName = ${user.lastName !== undefined ? user.lastName : latestUser.lastName} WHERE id = ${id}`;

        return client?.queryObject(
            query
        );
    }

    delete(id: number) {
        return client?.queryObject(`DELETE FROM users WHERE id = ${id}`);
    }
}

export default new UserRepo();