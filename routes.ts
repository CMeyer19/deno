import { Router } from "./deps.ts";
import getUsers from "./controllers/getUsers.ts";
import getUser from "./controllers/getUser.ts";
import createUser from "./controllers/createUser.ts";
import updateUser from "./controllers/updateUser.ts";
import deleteUser from "./controllers/deleteUser.ts";

const router = new Router();

router
    .get("/users", getUsers)
    .get("/users/:id", getUser)
    .post("/users", createUser)
    .put("/users/:id", updateUser)
    .delete("/users/:id", deleteUser);

export default router;