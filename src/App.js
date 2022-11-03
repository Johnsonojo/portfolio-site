import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainNav from "./components/MainNav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ThemeContext } from "./context/theme-context";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/About";
import AllBlog from "./pages/Blog/All";
import CreateArticle from "./pages/Blog/Create";
import EditArticle from "./pages/Blog/Edit";
import SingleArticle from "./pages/Blog/SIngle";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  // check browser default theme
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("theme");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <div className={`theme-${theme}`}>
            <MainNav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<AllBlog />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog/:id" element={<SingleArticle />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute user={user?.id} />}>
                <Route
                  path="/blog/create-article"
                  element={<CreateArticle />}
                />
                <Route path="/blog/edit-article" element={<EditArticle />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
