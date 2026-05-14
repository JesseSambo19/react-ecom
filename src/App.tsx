import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContext from "./components/MainContext";
import ProductPage from "./components/ProductPage";
import PopularBlogs from "./components/PopularBlogs";
import TopSellers from "./components/TopSellers";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen flex-col md:flex-row">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden p-4 border-b flex items-center justify-between">
          <h1 className="text-lg font-bold">React Store</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 border rounded hover:bg-gray-200"
          >
            ☰
          </button>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden overflow-y-auto bg-white border-b">
            <Sidebar />
          </div>
        )}

        <div className="w-full flex justify-center flex-wrap overflow-y-auto">
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

          <div className="w-full md:w-auto flex flex-col md:flex-col gap-4 md:gap-0 px-4 md:px-0">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
