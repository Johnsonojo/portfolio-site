import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainNav from "./components/mainNav";
import AboutPage from "./pages/About";
import Blog from "./pages/Blog";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
