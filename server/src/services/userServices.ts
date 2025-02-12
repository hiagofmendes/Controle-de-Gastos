// AQUI SERA FEITO AS REQ NO BANCO

import { setUncaughtExceptionCaptureCallback } from "node:process";
import database from "../../config/database";

export const findUserByEmail = async (email: any) => {
  const db = database();
  const result = await db("userRegister").select("*").where({ email }).first();
  db.destroy();
  return result;
};

export const userRegister = async (name: any, email: any, password: any) => {
  const db = database();
  await db("userRegister").insert({
    name,
    email,
    password,
  });
  return;
};

export const addTransaction = async (
  description: any,
  value: any,
  type: any
) => {
  const db = database();
  await db("transactions").insert({
    description,
    value,
    type,
  });
  return;
};

export const getTransactions = async () => {
  const db = database();
  const result = await db("transactions").select("*");
  // db.destroy();
  return result;
};

export const transactionUpdate = async (
  id: any,
  description: any,
  value: any,
  type: any
) => {
  const db = database();
  const existingTransaction = await db("transactions").where({ id }).first();
  if (!existingTransaction) {
    return;
  }

  const updated = await db("transactions").where({ id }).update({
    description,
    value,
    type,
  });
  // db.destroy();
  const updatedTransaction = await db("transactions").where({ id }).first();
  return updatedTransaction;
};

export const deleteTransaction = async (id: any) => {
  const db = database();
  const deleted = await db("transactions").where({ id }).delete();
  db.destroy();
  return deleted;
};
