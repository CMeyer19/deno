import client from "../db/database.ts";
import UserInterface from "../abstractions/interfaces/user.interface.ts"
import {IdentifierType} from "../abstractions/types/identifier.type.ts";
import {QueryArrayResult, QueryObjectResult} from "https://deno.land/x/postgres@v0.15.0/query/query.ts";

class UserRepo {
    public create(user: UserInterface): Promise<QueryObjectResult<any>> {
        return client.queryObject(`INSERT INTO users(firstname, lastname) VALUES ('${user.firstName}', '${user.lastName}') RETURNING id`);
    }

    public selectAll(): Promise<QueryArrayResult<Array<UserInterface>>> {
        return client.queryArray("SELECT * FROM users ORDER BY id");
    }

    public selectById(id: IdentifierType): Promise<QueryObjectResult<UserInterface>> {
        return client.queryObject(`SELECT * FROM users WHERE id = ${id}`);
    }

    async update(id: IdentifierType, user: UserInterface) {
        const result: QueryObjectResult<UserInterface> = await this.selectById(id);
        const latestUser: UserInterface = result.rows[0];
        const query = `UPDATE users SET firstName = '${user.firstName !== undefined ? user.firstName : latestUser.firstName}', lastName = '${user.lastName !== undefined ? user.lastName : latestUser.lastName}' WHERE id = ${id}`;

        return client.queryObject(query);
    }

    delete(id: IdentifierType) {
        return client.queryObject(`DELETE FROM users WHERE id = ${id}`);
    }
}

export default new UserRepo();