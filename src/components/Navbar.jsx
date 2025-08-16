import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Caderno de Questões</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/resolver">Resolver</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cadastrar">Cadastrar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/listar">Gerenciar Questões</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favoritos">Favoritos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
