import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  flex: 1;
`;

interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
  return <Root>{children}</Root>;
};

export default Content;
