import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
    GAME_STATES, PLAYER_X, PLAYER_O, switchPlayer,
    SQUARE_DIMS, DIMS, DRAW,
    getRandomInt,
} from "utils";
import { Square, Board, CustomModal } from "components";

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

    const [modalOpen, setModalOpen] = useState(false);

    /**
   * On every move, check if there is a winner. If yes, set game state to over and open result modal
   */
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
            // Slight delay for the modal so there is some time to see the last move
            setTimeout(() => setModalOpen(true), 300);
        };

        if (winner !== null && gameState !== GAME_STATES.over) {
            declareWinner(winner);
        }
    }, [gameState, grid, nextMove]);


    /**
    * Set the grid square with respective player that made the move. Only make a move when the game is in progress.
    * useCallback is necessary to prevent unnecessary recreation of the function, unless gameState changes, since it is
    * being tracked in useEffect
    * @type {Function}
    */

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
        setModalOpen(false); // Close the modal when new game starts
    };

    /**
    * Make computer move when it's computer's turn
    */
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

    return gameState === GAME_STATES.notStarted ? (
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
    ) : (
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
                <Strikethrough
                    styles={
                        gameState === GAME_STATES.over && board.getStrikethroughStyles()
                    }
                />
                <CustomModal
                    isOpen={modalOpen}
                    winner={winner}
                    close={() => setModalOpen(false)}
                    startNewGame={startNewGame}
                />
            </Container>
        );
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

const Strikethrough = styled.div`
  position: absolute;
  ${({ styles }) => styles}
  background-color: indianred;
  height: 5px;
  width: ${({ styles }) => !styles && "0px"};
`;

export default Tictactoe;
