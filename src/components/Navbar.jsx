import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "text-blue-500 font-bold"
      : "text-gray-700 hover:text-blue-400";

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between p-4">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link to="/cadastrar" className={linkStyle("/cadastrar")}>
          Cadastrar Questão
        </Link>
        <Link to="/favoritos" className={linkStyle("/favoritos")}>
          Favoritos
        </Link>
      </div>
    </nav>
  );
}
