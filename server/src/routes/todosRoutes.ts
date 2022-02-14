import {Router} from "express";
import todosController from "../controllers/todosController";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import todosValidation from "../validation/todosValidation";

const router = Router();

/* GET api/todos */
router.get("/", jwtMiddleware.authorizeToken, todosController.getTodos);

/* GET api/todos/:id */
router.get("/:id", jwtMiddleware.authorizeToken, todosValidation.getTodo, todosController.getTodo);

/* POST api/todos */
router.post("/", jwtMiddleware.authorizeToken, todosValidation.createTodo, todosController.createTodo);

/* PUT api/todos/:id */
router.put("/:id", jwtMiddleware.authorizeToken, todosValidation.updateTodo, todosController.updateTodo);

/* DELETE api/todos/:id */
router.delete("/:id", jwtMiddleware.authorizeToken, todosValidation.deleteTodo, todosController.deleteTodo);

export default router;
