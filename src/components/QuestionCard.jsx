import { useState } from "react";

export default function QuestionCard({ question, onAnswer, onDeleteOption, onRestoreOption }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (opt) => {
    setSelected(opt);
    if (opt.correct) {
      alert("Parabéns!");
    } else {
      alert("Revise esse item");
    }
    onAnswer(opt);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <div key={i} className="flex items-center justify-between">
            <button
              onClick={() => handleSelect(opt)}
              className={`w-full text-left p-2 rounded ${selected === opt ? "bg-green-300" : "bg-gray-100"}`}
            >
              {opt.text}
            </button>
            {opt.deleted ? (
              <button onClick={() => onRestoreOption(i)} className="ml-2 text-blue-500">↩</button>
            ) : (
              <button onClick={() => onDeleteOption(i)} className="ml-2 text-red-500">🗑</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
