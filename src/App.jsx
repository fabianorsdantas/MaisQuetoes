import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cadastrar from "./pages/Cadastrar";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
