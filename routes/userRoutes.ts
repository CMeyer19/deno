import getUsers from "../controllers/getUsers.ts";
import getUser from "../controllers/getUser.ts";
import createUser from "../controllers/createUser.ts";
import updateUser from "../controllers/updateUser.ts";
import deleteUser from "../controllers/deleteUser.ts";
import {Router} from "../deps.ts";

const peopleRouter = new Router();

peopleRouter
    .get("/", getUsers)
    .post("/", createUser)
    .get("/:id", getUser)
    .put("/:id", updateUser)
    .delete("/:id", deleteUser);

export default peopleRouter;
