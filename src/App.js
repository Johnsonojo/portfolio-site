import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Blog from "./pages/Blog";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
