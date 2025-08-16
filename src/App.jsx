import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cadastrar from "./pages/Cadastrar";
import Resolver from "./pages/Resolver";
import Listar from "./pages/Listar";
import Favoritos from "./pages/Favoritos";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cadastrar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/resolver/:id" element={<Resolver />} />
        <Route path="/listar" element={<Listar />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </Router>
  );
}
