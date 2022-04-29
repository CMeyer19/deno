import {Router} from "../deps.ts";
import peopleRouter from './userRoutes.ts';

const router = new Router();

router.get("/users", peopleRouter.routes(), peopleRouter.allowedMethods());

export default router;
