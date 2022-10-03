import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  flex-shrink: 1;
  height: 100vh;
  border-right: 1px solid grey;
`;

interface Props {}

const LNB: React.FC<Props> = () => {
  return <Root>LNB</Root>;
};

export default LNB;
