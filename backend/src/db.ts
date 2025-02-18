import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export const connectDB = async () => {
  try {
    const dbPath = path.resolve(__dirname, "../db/quiz.db");
    console.log(`Conectando ao banco de dados em: ${dbPath}`);

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Conexão com o banco de dados estabelecida.");

    return db;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
    } else {
      console.error("Erro desconhecido ao conectar ao banco de dados:", error);
    }
    throw error;
  }
};
