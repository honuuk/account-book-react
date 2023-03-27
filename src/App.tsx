import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Home from "./pages/Home";

import "./components/layout/layout.css";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};

export default App;
