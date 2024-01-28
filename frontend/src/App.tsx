import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Agents from "./pages/Agents";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <div className="relative min-h-screen w-full">
        <Sidebar />
        <div className="w-[calc(100%-300px)] ml-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agents" element={<Agents />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
