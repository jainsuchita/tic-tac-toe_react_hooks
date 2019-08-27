import React from "react";
import styled from "styled-components";
import TicTacToe from "./TicTacToe";

function App() {
  return (
    <MainContainer>
      <TicTacToe />
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
