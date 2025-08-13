import { openDB } from "idb";

const DB_NAME = "questoesDB";
const STORE_NAME = "questoes";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function addQuestao(questao) {
  const db = await initDB();
  await db.add(STORE_NAME, questao);
}

export async function getQuestoes() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function getQuestaoById(id) {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
}

export async function updateQuestao(questao) {
  const db = await initDB();
  await db.put(STORE_NAME, questao);
}

export async function deleteQuestao(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
