import {Client} from "../deps.ts";

class Database {
    public client: Client | undefined = undefined;

    constructor() {
        this.connect();
    }

    async connect() {
        this.client = new Client({
            user: "postgres",
            database: "api",
            hostname: "127.0.0.1",
            password: "admin",
            port: 5432
        });

        await this.client.connect();
    }
}

export default new Database().client;
