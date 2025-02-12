import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  addTransaction,
  findUserByEmail,
  getTransactions,
  userRegister,
  transactionUpdate,
  deleteTransaction,
} from "../services/userServices";

export default class UserController {
  public static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios" });
      }
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      const secret = process.env.JWT_SECRET || null;
      if (!secret) {
        return res.status(403).json({ message: "Invalid secret JWT" });
      }
      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao logar" });
    }
  }
  public static async create(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Os campos são obrigatórios" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userRegister(name, email, hashedPassword);
      return res
        .status(201)
        .json({ message: "Usuário registrado com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Error ao registrar" });
    }
  }

  public static async transactions(req: Request, res: Response): Promise<any> {
    try {
      const { description, value, type } = req.body;
      if (!description || !value || !type) {
        return res.status(400).json({ error: "Todos campos são obrigatórios" });
      }

      await addTransaction(description, value, type);
      return res
        .status(201)
        .json({ message: "Transação adicionada com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Error ao adicionar transação" });
    }
  }
  public static async listTransactions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const transactions = await getTransactions();
      return res.json(transactions);
    } catch (err) {
      return res.status(500).json({ message: "Error ao listar transações" });
    }
  }
  public static async updateTransactions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { id } = req.params;

      const { description, value, type } = req.body;

      if (!id || !description || !value || !type) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const transactionValue = Number(value);

      const updatedTransaction = await transactionUpdate(
        id,
        description,
        transactionValue,
        type
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transação não encontrada" });
      }

      return res.json({
        message: "Transação atualizada com sucesso",
        updatedTransaction,
      });
    } catch (err) {
      return res.status(500).json({ message: "Error ao atualizar transação" });
    }
  }

  public static async deleteTransactions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID da transação é obrigatório" });
      }

      const deletedTransaction = await deleteTransaction(id);

      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transação não encontrada" });
      }
      return res.json({ message: "Transação excluída com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: "Erro ao excluir transação" });
    }
  }
}
