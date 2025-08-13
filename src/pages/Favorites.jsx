import { useEffect, useState } from "react";
import { getQuestoes } from "../data/db";

export default function Favoritos() {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    getQuestoes().then((data) => {
      setFavoritas(data.filter((q) => q.favorita));
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Questões Favoritas</h1>
      {favoritas.length === 0 && <p>Nenhuma questão favorita.</p>}
      {favoritas.map((q) => (
        <div key={q.id} className="bg-white shadow p-4 mb-4 rounded">
          <h2 className="font-bold">{q.disciplina}</h2>
          <p>{q.enunciado}</p>
        </div>
      ))}
    </div>
  );
}
