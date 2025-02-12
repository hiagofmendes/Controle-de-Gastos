import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

// Rota de registro de usuário
router.post("/register", UserController.create);
//Rota de login do usuário
router.post("/login", UserController.login);

router.post("/transactions", UserController.transactions);
router.get("/listTransactions", UserController.listTransactions);
router.put("/updateTransactions/:id", UserController.updateTransactions);
router.delete("/deleteTransactions/:id", UserController.deleteTransactions);

export default router;
