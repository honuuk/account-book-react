import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainNav from "./components/layout/MainNav";
import { Toaster } from "./components/ui/toaster";

import Overview from "./pages/Overview";
import Assets from "./pages/Assets";
import CashFlow from "./pages/CashFlow";
import Simulation from "./pages/Simulation";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="sm:mx-6" />
          </div>
        </div>
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/cashFlow" element={<CashFlow />} />
            <Route path="/simulation" element={<Simulation />} />
          </Routes>
        </QueryClientProvider>
      </div>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
