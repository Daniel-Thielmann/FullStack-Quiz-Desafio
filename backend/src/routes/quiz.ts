import { Router, Request, Response } from "express";
import { connectDB } from "../db";

interface Resposta {
  perguntaId: number;
  alternativaEscolhida: number;
}

interface Resultado {
  totalPerguntas: number;
  acertos: number;
  percentualAcertos: number;
}

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Recebendo requisição para /quiz");
    const db = await connectDB();
    console.log("Conexão com o banco estabelecida.");

    const perguntas = await db.all("SELECT * FROM perguntas");
    console.log("Perguntas encontradas:", perguntas);

    const perguntasParsed = perguntas.map((pergunta) => ({
      ...pergunta,
      alternativas: JSON.parse(pergunta.alternativas),
    }));

    console.log("Perguntas após parsing:", perguntasParsed);

    res.json(perguntasParsed);
  } catch (error: any) {
    console.error("Erro ao buscar perguntas:", error.message || error);
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const respostas: Resposta[] = req.body.respostas;

    if (!Array.isArray(respostas) || respostas.length === 0) {
      res.status(400).json({ error: "Respostas inválidas." });
      return;
    }

    const db = await connectDB();
    const perguntas = await db.all("SELECT * FROM perguntas");

    let acertos = 0;

    respostas.forEach((resposta) => {
      const pergunta = perguntas.find((p) => p.id === resposta.perguntaId);
      if (
        pergunta &&
        resposta.alternativaEscolhida === pergunta.resposta_correta
      ) {
        acertos += 1;
      }
    });

    const totalPerguntas = perguntas.length;
    const percentualAcertos = (acertos / totalPerguntas) * 100;

    const resultado: Resultado = {
      totalPerguntas,
      acertos,
      percentualAcertos: parseFloat(percentualAcertos.toFixed(2)),
    };

    console.log("Resultado do Quiz:", resultado);

    res.json(resultado);
  } catch (error: any) {
    console.error(
      "Erro ao calcular resultado do quiz:",
      error.message || error
    );
    res.status(500).json({ error: "Erro ao calcular resultado do quiz." });
  }
});

export default router;
