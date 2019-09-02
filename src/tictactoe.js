import React, { useState } from "react";
import styled from "styled-components";
import { GAME_STATES, PLAYER_X, PLAYER_O, switchPlayer } from "utils";
import { Board } from "components";

const Tictactoe = () => {
    const [gameState, setGameState] = useState(GAME_STATES.notStarted);
    const [players, setPlayers] = useState({
        human: PLAYER_X,
        computer: PLAYER_O
    });

    const choosePlayer = option => {
        setPlayers({ human: option, computer: switchPlayer(option) });
        setGameState(GAME_STATES.inProgress);
    };

    if (gameState === GAME_STATES.notStarted) {
        return (
            <Screen>
                <Inner>
                    <ChooseText>Choose your player</ChooseText>
                    <ButtonRow>
                        <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
                        <p>or</p>
                        <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
                    </ButtonRow>
                </Inner>
            </Screen>
        )
    }

    else {
        return (
            <Board players={players} />
        );

    }
}

const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`;

const Screen = styled.div``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ChooseText = styled.p``;

export default Tictactoe;
