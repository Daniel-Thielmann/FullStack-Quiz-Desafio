CREATE TABLE IF NOT EXISTS perguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta TEXT NOT NULL,
    alternativas TEXT NOT NULL, -- Alternativas armazenadas como JSON
    resposta_correta INTEGER NOT NULL -- Índice da resposta correta
);
