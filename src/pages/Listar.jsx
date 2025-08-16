import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listar() {
  const [questoes, setQuestoes] = useState([]);

  const carregarQuestoes = () => {
    const list = JSON.parse(localStorage.getItem("questoes")) || [];
    setQuestoes(list);
  };

  useEffect(() => {
    carregarQuestoes();
  }, []);

  const toggleFavorito = (id) => {
    const novaLista = questoes.map(q =>
      q.id === id ? { ...q, favorito: !q.favorito } : q
    );
    localStorage.setItem("questoes", JSON.stringify(novaLista));
    setQuestoes(novaLista);
  };

  const excluirQuestao = (id) => {
    if (!window.confirm("Deseja realmente excluir esta questão?")) return;
    const novaLista = questoes.filter(q => q.id !== id);
    localStorage.setItem("questoes", JSON.stringify(novaLista));
    setQuestoes(novaLista);
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Questões</h2>
      {questoes.length === 0 && <p>Nenhuma questão cadastrada.</p>}
      <div className="list-group">
        {questoes.map(q => (
          <div key={q.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{q.enunciado}</div>
              <small>{q.disciplina} · {q.favorito ? "⭐ Favorita" : ""}</small>
            </div>
            <div className="btn-group btn-group-sm">
              <Link to={`/cadastrar`} state={{ questao: q }} className="btn btn-outline-primary">Editar</Link>
              <button className={`btn btn-outline-warning`} onClick={() => toggleFavorito(q.id)}>
                {q.favorito ? "Remover ⭐" : "Favoritar ☆"}
              </button>
              <button className="btn btn-outline-danger" onClick={() => excluirQuestao(q.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
