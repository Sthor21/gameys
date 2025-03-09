import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import Tenzies from "./Pages/Tenzies/Tenzies";
import Hangman from "./Pages/Hangman/Hangman";
import MemoryGame from "./Pages/MemoryGame/MemoryGame";
import Contact from "./Pages/Contact/Contact";

function RedirectToGit() {
  useEffect(() => {
    window.location.href = "https://github.com/Sthor21"; // External URL
  }, []);

  return null; // No need to render anything
}

function App() {
  return (
    <Router basename="/gameys"> {/* Added basename for GitHub Pages */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tenzies" element={<Tenzies />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/memorygame" element={<MemoryGame />} />
        <Route path="/contribute" element={<RedirectToGit />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
