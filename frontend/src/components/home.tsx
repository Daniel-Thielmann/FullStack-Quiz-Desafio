import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-black flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-24 mb-20"></div>
      <h1 className="text-4xl font-bold mb-6">
        Bem-vindo ao Sistema de Quiz de Programação!
      </h1>
      <h2 className="text-4xl font-bold mb-6">
        Desafio de Estágio para o cargo de Mentor Full Stack da Codi Academy de
        2025!
      </h2>
      <button
        className="px-12 py-6 bg-blue-900 text-white font-bold rounded-lg text-xl shadow-md hover:bg-blue-700 transition mt-6"
        onClick={() => navigate("/quiz")}
      >
        Iniciar Quiz Desafio
      </button>

      <div className="flex flex-col text-2xl text-black font-bold mt-16 justify-center items-center">
        <h2>Desenvolvedor</h2>
        <h2>Daniel Thielmann</h2>
      </div>
      <div className="flex flex-row gap-24 text-2xl text-black font-bold mt-16">
        <a
          href="https://github.com/FullStack-lab/processo-seletivo-codi-2025-1-Daniel-Thielmann/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"src/public/git.png"}
            alt="GitHub"
            className="w-40 h-auto hover:opacity-80 transition"
          />
        </a>
        <a
          href="https://codiacademy.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"src/public/codi.png"}
            alt="Logo da Codi"
            className="w-48 h-auto hover:opacity-80 transition"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;
