import {Client} from "../deps.ts";

class Database {
    public readonly client: Client = new Client({
        user: "postgres",
        database: "api",
        hostname: "127.0.0.1",
        password: "admin",
        port: 5432
    });

    constructor() {
        this.connect();
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async disconnect(): Promise<void> {
        await this.client.end();
    }
}

export default new Database().client;
