import {Router} from "../deps.ts";
import userRoutes from './userRoutes.ts';

const router = new Router();

router.get("/users", userRoutes.routes(), userRoutes.allowedMethods());

export default router;
