import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
    GAME_STATES, PLAYER_X, PLAYER_O, switchPlayer,
    SQUARE_DIMS, DIMS, DRAW,
    getRandomInt,
} from "utils";
import { Square, Board } from "components";

const arr = new Array(DIMS ** 2).fill(null);
const board = new Board();

const Tictactoe = () => {
    const [grid, setGrid] = useState(arr);

    const [gameState, setGameState] = useState(GAME_STATES.notStarted);

    const [players, setPlayers] = useState({
        human: PLAYER_X,
        computer: PLAYER_O
    });

    const [nextMove, setNextMove] = useState(null);

    const [winner, setWinner] = useState(null);

    const move = useCallback(
        (index, player) => {
            if (player && gameState === GAME_STATES.inProgress) {
                setGrid(grid => {
                    const gridCopy = grid.concat();
                    gridCopy[index] = player;
                    return gridCopy;
                });
            }
        },
        [gameState]
    );

    const computerMove = useCallback(() => {
        let index = getRandomInt(0, 8);
        while (grid[index]) {
            index = getRandomInt(0, 8);
        }

        move(index, players.computer);
        setNextMove(players.human);

    }, [move, grid, players]);

    const humanMove = index => {
        if (!grid[index]) {
            move(index, players.human);
            setNextMove(players.computer);
        }
    };

    const choosePlayer = option => {
        setPlayers({ human: option, computer: switchPlayer(option) });
        setGameState(GAME_STATES.inProgress);
        setNextMove(PLAYER_X); // Set the Player X to make the first move
    };

    const startNewGame = () => {
        setGameState(GAME_STATES.notStarted);
        setGrid(arr);
    };

    useEffect(() => {
        let timeout;
        if (
            nextMove !== null &&
            nextMove === players.computer &&
            gameState !== GAME_STATES.over
        ) {
            // Delay computer moves to make them more natural
            timeout = setTimeout(() => {
                computerMove();
            }, 500);
        }

        // ComponentUnmount lifecycle hook
        return () => timeout && clearTimeout(timeout);

    }, [nextMove, computerMove, players.computer, gameState]);

    //It makes sense to check if the game has reached the end after each move is made, so we'll introduce another useEffect hook to track these changes.
    useEffect(() => {
        const winner = board.getWinner(grid);

        const declareWinner = winner => {
            let winnerStr;
            switch (winner) {
                case PLAYER_X:
                    winnerStr = "Player X wins!";
                    break;
                case PLAYER_O:
                    winnerStr = "Player O wins!";
                    break;
                case DRAW:
                default:
                    winnerStr = "It's a draw";
            }
            setGameState(GAME_STATES.over);
            setWinner(winnerStr);
        };

        if (winner !== null && gameState !== GAME_STATES.over) {
            declareWinner(winner);
        }
    }, [gameState, grid, nextMove]);

    switch (gameState) {
        case GAME_STATES.notStarted:
        default:
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
            );
        case GAME_STATES.inProgress:
            return (
                <Container dims={DIMS}>
                    {
                        grid.map((value, index) => {
                            const isActive = value !== null;
                            return (
                                <Square
                                    isActive={isActive}
                                    value={value === PLAYER_X ? "X" : "O"}
                                    key={index}
                                    onClick={() => humanMove(index)}
                                />
                            );
                        })
                    }
                </Container>
            );
        case GAME_STATES.over:
            return (
                <div>
                    <p>{winner}</p>
                    <button onClick={startNewGame}>Start over</button>
                </div>
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;

export default Tictactoe;
