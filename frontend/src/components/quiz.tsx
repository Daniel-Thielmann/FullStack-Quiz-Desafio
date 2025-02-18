import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Pergunta {
  id: number;
  pergunta: string;
  alternativas: string[];
  resposta_correta: number;
}

interface Resposta {
  perguntaId: number;
  alternativaEscolhida: number;
}

interface Resultado {
  totalPerguntas: number;
  acertos: number;
  percentualAcertos: number;
}

const Quiz: React.FC = () => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await fetch("/quiz");
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar perguntas do backend. Status: ${response.status}`
          );
        }
        const data: Pergunta[] = await response.json();
        setPerguntas(data);
      } catch (error: any) {
        console.error("Erro no frontend:", error.message || error);
        setError("Não foi possível carregar as perguntas.");
      }
    };

    fetchPerguntas();
  }, []);

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;

    setSelectedOptionIndex(index);
    setShowFeedback(true);

    const resposta: Resposta = {
      perguntaId: perguntas[currentQuestionIndex].id,
      alternativaEscolhida: index,
    };
    setRespostas((prev) => [...prev, resposta]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < perguntas.length - 1) {
      setSelectedOptionIndex(null);
      setShowFeedback(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      try {
        const response = await fetch("/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ respostas }),
        });

        if (!response.ok) {
          throw new Error(
            `Erro ao submeter respostas. Status: ${response.status}`
          );
        }

        const data: Resultado = await response.json();
        setResultado(data);
      } catch (error: any) {
        console.error("Erro ao submeter respostas:", error.message || error);
        setError("Não foi possível calcular o resultado do quiz.");
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl font-semibold text-red-700">{error}</p>
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="text-black flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Finalizado!</h2>
          <p className="text-xl mb-4">
            Total de Perguntas: {resultado.totalPerguntas}
          </p>
          <p className="text-xl mb-4">Número de Acertos: {resultado.acertos}</p>
          <p className="text-xl mb-6">
            Percentual de Acertos: {resultado.percentualAcertos}%
          </p>
          <div className="flex justify-between">
            <button
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setRespostas([]);
                setResultado(null);
                setSelectedOptionIndex(null);
                setShowFeedback(false);
              }}
            >
              Reiniciar Quiz
            </button>
            <button
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/")}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (perguntas.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
        <p className="text-xl font-semibold">Carregando perguntas...</p>
      </div>
    );
  }

  const currentPergunta = perguntas[currentQuestionIndex];

  return (
    <div className="text-black flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6">
          Pergunta {currentQuestionIndex + 1} de {perguntas.length}
        </h2>
        <p className="text-xl mb-4">{currentPergunta.pergunta}</p>
        <div className="space-y-4">
          {currentPergunta.alternativas.map((option, index) => {
            let buttonClasses =
              "w-full px-4 py-2 border rounded-lg text-left focus:outline-none transition";

            if (showFeedback) {
              if (index === currentPergunta.resposta_correta) {
                buttonClasses += " bg-green-200 border-green-500";
              } else if (
                index === selectedOptionIndex &&
                index !== currentPergunta.resposta_correta
              ) {
                buttonClasses += " bg-red-200 border-red-500";
              } else {
                buttonClasses += " bg-gray-100 border-gray-300";
              }
            } else {
              buttonClasses += " bg-blue-100 border-blue-500 hover:bg-blue-200";
            }

            return (
              <button
                key={index}
                className={buttonClasses}
                onClick={() => handleOptionClick(index)}
                disabled={showFeedback}
              >
                {option}
              </button>
            );
          })}
        </div>
        {showFeedback && (
          <div className="mt-6 flex justify-end">
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < perguntas.length - 1
                ? "Próximo"
                : "Finalizar"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-24">
        <button
          className="px-6 py-3 bg-blue-900 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition mt-6"
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default Quiz;
