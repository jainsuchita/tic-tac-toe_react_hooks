import React from "react";
import styled from "styled-components";
// import TicTacToe from "./TicTacToe";
import { Board } from "./components";

function App() {
  return (
    <MainContainer>
      <Board />
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
