import { useState } from "react";

export default function QuestionForm({ onSave }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [type, setType] = useState("multipla");
  const [discipline, setDiscipline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      text,
      type,
      discipline,
      options: options.map((opt, i) => ({
        text: opt,
        correct: i === correctIndex,
        deleted: false
      }))
    };
    onSave(question);
    setText("");
    setOptions(["", ""]);
    setDiscipline("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="Enunciado"
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Disciplina"
        className="border p-2 w-full"
        value={discipline}
        onChange={(e) => setDiscipline(e.target.value)}
        required
      />

      <select className="border p-2 w-full" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="multipla">Múltipla escolha</option>
        <option value="certo-errado">Certo ou Errado</option>
      </select>

      {options.map((opt, i) => (
        <div key={i} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Opção ${i + 1}`}
            className="border p-2 flex-1"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[i] = e.target.value;
              setOptions(newOptions);
            }}
            required
          />
          <input
            type="radio"
            name="correct"
            checked={correctIndex === i}
            onChange={() => setCorrectIndex(i)}
          />
        </div>
      ))}

      <button type="button" onClick={() => setOptions([...options, ""])} className="text-blue-500">
        + Adicionar opção
      </button>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar Questão
      </button>
    </form>
  );
}
