import { useEffect, useState } from "react";

export default function Home() {
  const [questoes, setQuestoes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [resposta, setResposta] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Carregar questões do LocalStorage (ou IndexedDB)
  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("questoes")) || [];
    setQuestoes(salvas);
  }, []);

  if (questoes.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Banco de Questões</h2>
        <p>⚠️ Nenhuma questão cadastrada ainda. Vá em <strong>Cadastrar</strong> para adicionar.</p>
      </div>
    );
  }

  const questao = questoes[indiceAtual];

  function verificarResposta() {
    if (resposta === questao.respostaCorreta) {
      setFeedback({ tipo: "success", mensagem: "🎉 Parabéns! Você acertou a questão." });
    } else {
      setFeedback({ tipo: "danger", mensagem: "❌ Revise esse item." });
    }
  }

  function avancar() {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual(indiceAtual + 1);
      resetarQuestao();
    }
  }

  function voltar() {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
      resetarQuestao();
    }
  }

  function resetarQuestao() {
    setResposta(null);
    setFeedback(null);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Questão {indiceAtual + 1} de {questoes.length}</h2>

      <div className="card p-4 shadow">
        <p><strong>Disciplina:</strong> {questao.disciplina}</p>
        <p><strong>Enunciado:</strong> {questao.enunciado}</p>

        {questao.opcoes.map((opcao, i) => (
          <div className="form-check" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name="resposta"
              value={opcao}
              checked={resposta === opcao}
              onChange={(e) => setResposta(e.target.value)}
            />
            <label className="form-check-label">{opcao}</label>
          </div>
        ))}

        <button
          className="btn btn-primary mt-3"
          onClick={verificarResposta}
          disabled={!resposta}
        >
          Confirmar
        </button>

        {feedback && (
          <div className={`alert alert-${feedback.tipo} mt-3`} role="alert">
            {feedback.mensagem}
          </div>
        )}

        {/* Navegação entre questões */}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={voltar} disabled={indiceAtual === 0}>
            ⬅️ Voltar
          </button>
          <button className="btn btn-secondary" onClick={avancar} disabled={indiceAtual === questoes.length - 1}>
            Avançar ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
