import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContext from "./components/MainContext";
import ProductPage from "./components/ProductPage";
import PopularBlogs from "./components/PopularBlogs";
import TopSellers from "./components/TopSellers";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="rounded w-full flex justify-center flex-wrap">
          <Routes>
            <Route
              path="/"
              element={<MainContext />}
            />
             <Route
              path="/product/:id"
              element={<ProductPage />}
            />
          </Routes>
    

          <div>
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
