import React, { useState } from "react";
import styled from "styled-components";
// import { DIMS, PLAYER_X, PLAYER_O, SQUARE_DIMS } from "./constants";

const DIMS = 3;
// const DRAW = 0;
const PLAYER_X = 1;
const PLAYER_O = 2;
const SQUARE_DIMS = 100;

const arr = new Array(DIMS ** 2).fill(null);

const TicTacToe = () => {
    const [grid, setGrid] = useState(arr);
    const [players, setPlayers] = useState({
        human: PLAYER_X,
        computer: PLAYER_O
    });

    const move = (index, player) => {
        setGrid(grid => {
            const gridCopy = grid.concat();
            gridCopy[index] = player;
            console.log(gridCopy)
            return gridCopy;
        });
    };

    const humanMove = index => {
        if (!grid[index]) {
            move(index, players.human);
        }
    };

    return (
        <Container dims={DIMS}>
            {
                grid.map((value, index) => {
                    const isActive = value !== null;

                    return (
                        <Box
                            key={index}
                            onClick={() => humanMove(index)}
                        >
                            {
                                isActive &&
                                <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>
                            }
                        </Box>
                    );
                })
            }
        </Container>

    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SQUARE_DIMS}px;
  height: ${SQUARE_DIMS}px;
  border: 1px solid black;

  &:hover {
    cursor: pointer;
  }
`;

const Marker = styled.p`
  font-size: 68px;
`;

export default TicTacToe;
