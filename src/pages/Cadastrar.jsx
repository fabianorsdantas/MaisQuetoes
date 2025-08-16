import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const defaultDisciplines = [
  "Geral",
  "Matemática",
  "Português",
  "Informática",
  "Direito",
  "Física",
  "Química",
  "Biologia",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function Cadastrar() {
  const navigate = useNavigate();
  const location = useLocation();
  const editarId = location.state?.editarId;

  const [disciplina, setDisciplina] = useState("Geral");
  const [enunciado, setEnunciado] = useState("");
  const [opcoes, setOpcoes] = useState([{ id: uid(), texto: "" }, { id: uid(), texto: "" }]);
  const [respostaCorreta, setRespostaCorreta] = useState("");

  useEffect(() => {
    if (editarId != null) {
      const list = JSON.parse(localStorage.getItem("questoes")) || [];
      const questao = list.find(q => q.id === editarId);
      if (questao) {
        setDisciplina(questao.disciplina);
        setEnunciado(questao.enunciado);
        setOpcoes(questao.opcoes);
        setRespostaCorreta(questao.respostaCorreta);
      }
    }
  }, [editarId]);

  const adicionarOpcao = () => {
    setOpcoes(prev => [...prev, { id: uid(), texto: "" }]);
  };

  const alterarOpcao = (id, valor) => {
    setOpcoes(prev => prev.map(o => o.id === id ? { ...o, texto: valor } : o));
  };

  const removerOpcao = (id) => {
    setOpcoes(prev => prev.filter(o => o.id !== id));
    if (respostaCorreta === id) setRespostaCorreta("");
  };

  const salvar = () => {
    // Validações
    if (!disciplina.trim()) return alert("Informe a disciplina.");
    if (!enunciado.trim()) return alert("Informe o enunciado.");
    const opcoesValidas = opcoes.filter(o => o.texto.trim());
    if (opcoesValidas.length < 2) return alert("Informe pelo menos duas opções.");
    if (!respostaCorreta) return alert("Selecione a resposta correta.");

    const list = JSON.parse(localStorage.getItem("questoes")) || [];

    if (editarId != null) {
      // Editar
      const novaLista = list.map(q =>
        q.id === editarId
          ? { ...q, disciplina, enunciado, opcoes: opcoesValidas, respostaCorreta }
          : q
      );
      localStorage.setItem("questoes", JSON.stringify(novaLista));
      alert("Questão atualizada com sucesso!");
    } else {
      // Novo cadastro
      const novaQuestao = {
        id: Date.now(),
        disciplina,
        enunciado,
        opcoes: opcoesValidas,
        respostaCorreta,
        favorito: false
      };
      list.push(novaQuestao);
      localStorage.setItem("questoes", JSON.stringify(list));
      alert("Questão cadastrada com sucesso!");
    }

    navigate("/listar");
  };

  return (
    <div>
      <h2>{editarId != null ? "Editar Questão" : "Cadastrar Nova Questão"}</h2>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">Disciplina</label>
          <select
            className="form-select"
            value={disciplina}
            onChange={e => setDisciplina(e.target.value)}
          >
            {defaultDisciplines.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Enunciado</label>
          <textarea
            className="form-control"
            value={enunciado}
            onChange={e => setEnunciado(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Opções de Resposta</label>
          {opcoes.map((o, idx) => (
            <div key={o.id} className="input-group mb-2">
              <span className="input-group-text">
                <input
                  type="radio"
                  name="correta"
                  checked={respostaCorreta === o.id}
                  onChange={() => setRespostaCorreta(o.id)}
                />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={`Opção ${idx + 1}`}
                value={o.texto}
                onChange={e => alterarOpcao(o.id, e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => removerOpcao(o.id)}
              >
                ❌
              </button>
            </div>
          ))}
          <button className="btn btn-outline-primary" onClick={adicionarOpcao}>
            ➕ Adicionar Opção
          </button>
        </div>

        <div className="mt-3">
          <button className="btn btn-success" onClick={salvar}>
            {editarId != null ? "Salvar Alterações" : "Cadastrar Questão"}
          </button>
        </div>
      </div>
    </div>
  );
}
