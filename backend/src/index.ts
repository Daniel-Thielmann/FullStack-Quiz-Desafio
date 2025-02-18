import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import quizRouter from "./routes/quiz";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/quiz", quizRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Sistema de Quiz de Programação");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
