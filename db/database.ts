import {Client} from "../deps.ts";

class Database {
    public client: Client | undefined = undefined;

    constructor() {
        this.connect();
    }

    async connect() {
        this.client = new Client({
            user: "postgres",
            database: "logrocket_deno",
            hostname: "127.0.0.1",
            password: "postgres",
            port: 5432
        });

        await this.client.connect();
    }
}

export default new Database().client;
