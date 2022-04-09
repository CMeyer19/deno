import client from "../db/database.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts"

private class UserRepo {
    create(user: UserInterface) {
        return client.queryObject(
            "INSERT INTO users (firstName, lastName) VALUES ($1, $2)",
            user.firstName,
            user.lastName
        );
    }

    selectAll() {
        return client.queryArray("SELECT * FROM users ORDER BY id");
    }

    selectById(id: number) {
        return client.queryObject(`SELECT * FROM users WHERE id = $1`, id);
    }

    update(id: number, user: UserInterface) {
        const latestUser: UserInterface = this.selectById(id);
        const query = `UPDATE users SET firstName = $1, lastName = $2 WHERE id = $3`;

        return client.queryObject(
            query,
            user.firstName !== undefined ? user.firstName : latestUser.firstName,
            user.lastName !== undefined ? user.lastName : latestUser.lastName,
            id
        );
    }

    delete(id: number) {
        return client.queryObject(`DELETE FROM users WHERE id = $1`, id);
    }
}

export default new UserRepo();