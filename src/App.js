import React from "react";
import styled from "styled-components";
import Tictactoe from "./tictactoe";

function App() {
  return (
    <MainContainer>
      <Tictactoe />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
