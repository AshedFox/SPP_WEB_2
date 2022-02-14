import {Router} from 'express';
import usersController from "../controllers/usersController";
import usersValidation from "../validation/usersValidation";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const router = Router();

/* GET api/users */
router.get("/", jwtMiddleware.authorizeToken, usersController.getUsers);

/* GET api/users/:id */
router.get("/:id", jwtMiddleware.authorizeToken, usersValidation.getUser, usersController.getUser);

/* PUT api/users/:id */
router.put("/:id", jwtMiddleware.authorizeToken, usersValidation.updateUser, usersController.updateUser);

/* DELETE api/users/:id */
router.delete("/:id", jwtMiddleware.authorizeToken, usersValidation.deleteUser, usersController.deleteUser);

export default router;
