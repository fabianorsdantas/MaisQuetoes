import { useState, useEffect } from "react";
import { addQuestao, getQuestaoById, updateQuestao } from "../data/db";
import { useNavigate, useParams } from "react-router-dom";

export default function Cadastrar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    disciplina: "",
    tipo: "multipla",
    enunciado: "",
    opcoes: ["", ""],
    correta: "",
  });

  useEffect(() => {
    if (id) {
      getQuestaoById(Number(id)).then((data) => {
        if (data) setForm(data);
      });
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleOpcaoChange(index, value) {
    const novas = [...form.opcoes];
    novas[index] = value;
    setForm({ ...form, opcoes: novas });
  }

  function addOpcao() {
    setForm({ ...form, opcoes: [...form.opcoes, ""] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      await updateQuestao(form);
    } else {
      await addQuestao({ ...form, favorita: false });
    }
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Questão" : "Cadastrar Questão"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          name="disciplina"
          placeholder="Disciplina"
          value={form.disciplina}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={form.tipo} onChange={handleChange} className="border p-2 w-full">
          <option value="multipla">Múltipla Escolha</option>
          <option value="certoerrado">Certo/Errado</option>
        </select>
        <textarea
          className="border p-2 w-full"
          name="enunciado"
          placeholder="Enunciado"
          value={form.enunciado}
          onChange={handleChange}
          required
        />
        {form.opcoes.map((opcao, index) => (
          <input
            key={index}
            className="border p-2 w-full"
            placeholder={`Opção ${index + 1}`}
            value={opcao}
            onChange={(e) => handleOpcaoChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addOpcao} className="bg-gray-300 px-4 py-2 rounded">
          Adicionar opção
        </button>
        <input
          className="border p-2 w-full"
          name="correta"
          placeholder="Resposta Correta"
          value={form.correta}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
