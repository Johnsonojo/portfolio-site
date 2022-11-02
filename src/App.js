import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainNav from "./components/MainNav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/About";
import AllBlog from "./pages/Blog/All";
import CreateArticle from "./pages/Blog/Create";
import EditArticle from "./pages/Blog/Edit";
import SingleArticle from "./pages/Blog/SIngle";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Homepage";

const queryClient = new QueryClient();

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <MainNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<AllBlog />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog/:id" element={<SingleArticle />} />

            <Route element={<ProtectedRoute user={user?.id} />}>
              <Route path="/blog/create-article" element={<CreateArticle />} />
              <Route path="/blog/edit-article" element={<EditArticle />} />
              {/* <Route path="/blog/single:id" element={<EditArticle />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
