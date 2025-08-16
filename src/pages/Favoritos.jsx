import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  const carregarFavoritos = () => {
    const list = JSON.parse(localStorage.getItem("questoes")) || [];
    setFavoritos(list.filter(q => q.favorito));
  };

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const removerFavorito = (id) => {
    const list = JSON.parse(localStorage.getItem("questoes")) || [];
    const novaLista = list.map(q =>
      q.id === id ? { ...q, favorito: false } : q
    );
    localStorage.setItem("questoes", JSON.stringify(novaLista));
    setFavoritos(novaLista.filter(q => q.favorito));
  };

  return (
    <div className="container mt-4">
      <h2>Caderno de Favoritos</h2>
      {favoritos.length === 0 && <p>Nenhuma questão favoritada.</p>}
      <div className="list-group">
        {favoritos.map(q => (
          <div key={q.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{q.enunciado}</div>
              <small>{q.disciplina}</small>
            </div>
            <div className="btn-group btn-group-sm">
              <Link to={`/resolver/${q.id}`} className="btn btn-outline-success">Resolver</Link>
              <button className="btn btn-outline-danger" onClick={() => removerFavorito(q.id)}>Remover ⭐</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
