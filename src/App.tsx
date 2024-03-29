import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Home from "./pages/Home";

import "./components/layout/layout.css";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
