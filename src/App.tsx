import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainNav from "./components/layout/MainNav";

import Overview from "./pages/Overview";
import Assets from "./pages/Assets";
import Spending from "./pages/Spending";
import Simulation from "./pages/Simulation";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/spending" element={<Spending />} />
          <Route path="/simulation" element={<Simulation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
