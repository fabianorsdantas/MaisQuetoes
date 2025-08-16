import React, { useEffect, useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

export default function Resolver() {
  const [questoes, setQuestoes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [feedback, setFeedback] = useState("");
  const [acertos, setAcertos] = useState(0);

  // Carrega as questões do localStorage
  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("questoes")) || [];
    setQuestoes(lista);
    setIndiceAtual(0);
    setRespostaSelecionada("");
    setFeedback("");
    setAcertos(0);
  }, []);

  if (questoes.length === 0) {
    return (
      <div className="container mt-4">
        <h4>Nenhuma questão cadastrada</h4>
      </div>
    );
  }

  const questao = questoes[indiceAtual];

  const handleSelecionar = (opcaoId) => {
    setRespostaSelecionada(opcaoId);
    const correta = opcaoId === questao.correta;
    setFeedback(correta ? "Parabéns! Você acertou." : "Revise esse item.");
    if (correta) setAcertos(acertos + 1);
  };

  const handleFavorito = () => {
    const novaLista = questoes.map((q, i) =>
      i === indiceAtual ? { ...q, favorito: !q.favorito } : q
    );
    localStorage.setItem("questoes", JSON.stringify(novaLista));
    setQuestoes(novaLista);
  };

  const handleProxima = () => {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      setRespostaSelecionada("");
      setFeedback("");
    }
  };

  const handleAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
      setRespostaSelecionada("");
      setFeedback("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Resolver Questão {indiceAtual + 1} de {questoes.length}</h4>
        <button className="btn btn-outline-warning" onClick={handleFavorito}>
          {questao.favorito ? <StarFill /> : <Star />} Favorito
        </button>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{questao.disciplina}</h5>
          <p className="card-text">{questao.enunciado}</p>

          <div className="list-group">
            {questao.opcoes.map((opcao) => (
              <button
                key={opcao.id}
                className={`list-group-item list-group-item-action ${
                  respostaSelecionada
                    ? opcao.id === questao.correta
                      ? "list-group-item-success"
                      : opcao.id === respostaSelecionada
                      ? "list-group-item-danger"
                      : ""
                    : ""
                }`}
                onClick={() => handleSelecionar(opcao.id)}
                disabled={!!respostaSelecionada}
              >
                {opcao.texto}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`alert mt-3 ${
                feedback.includes("Parabéns") ? "alert-success" : "alert-danger"
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-secondary"
          onClick={handleAnterior}
          disabled={indiceAtual === 0}
        >
          Anterior
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleProxima}
          disabled={indiceAtual === questoes.length - 1}
        >
          Próxima
        </button>
      </div>

      <div className="text-end">
        <span className="badge bg-success">
          Acertos: {acertos} / {questoes.length}
        </span>
      </div>
    </div>
  );
}
