import { useEffect, useState } from "react";
import { getQuestoes, deleteQuestao, updateQuestao } from "../data/db";
import { Link } from "react-router-dom";

export default function Home() {
  const [questoes, setQuestoes] = useState([]);
  const [resposta, setResposta] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const data = await getQuestoes();
    setQuestoes(data);
  }

  function responder(questao, opcao) {
    setResposta(opcao);
    if (opcao === questao.correta) {
      setMensagem("Parabéns");
      updateQuestao({ ...questao, favorita: true });
    } else {
      setMensagem("Revise esse item");
    }
  }

  async function excluir(id) {
    await deleteQuestao(id);
    carregar();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Questões</h1>
      {questoes.map((q) => (
        <div key={q.id} className="bg-white shadow p-4 mb-4 rounded">
          <h2 className="font-bold">{q.disciplina}</h2>
          <p>{q.enunciado}</p>
          <div className="mt-2">
            {q.opcoes.map((op, idx) => (
              <button
                key={idx}
                onClick={() => responder(q, op)}
                className={`px-3 py-1 m-1 rounded border ${
                  resposta === op
                    ? op === q.correta
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-gray-200"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
          {mensagem && <p className="mt-2 font-bold">{mensagem}</p>}
          <div className="flex gap-2 mt-3">
            <Link to={`/cadastrar/${q.id}`} className="bg-yellow-400 px-3 py-1 rounded">
              Editar
            </Link>
            <button onClick={() => excluir(q.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
