import React from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Content from "./layout/Content";
import Info from "./layout/Info";
import LNB from "./layout/LNB";
import Home from "./pages/Home";

const Root = styled.div`
  display: flex;
`;

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Root>
        <LNB />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Content>
        <Info />
      </Root>
    </BrowserRouter>
  );
};

export default App;
