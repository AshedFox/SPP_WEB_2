import {Router} from 'express';
import jwtMiddleware from "../middlewares/jwtMiddleware";
import accountValidation from "../validation/accountValidation";
import accountController from "../controllers/accountController";

const router = Router();

/* POST account/signUp */
router.post("/signUp", accountValidation.signUp, accountController.signUp);

/* POST account/login */
router.post('/login', accountValidation.login, accountController.login);

/* POST account/refresh */
router.post('/refresh', accountController.refresh)

/* POST account/logout */
router.post('/logout', jwtMiddleware.authorizeToken, accountController.logout);

export default router;
