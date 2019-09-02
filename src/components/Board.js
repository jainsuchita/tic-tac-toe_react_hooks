import React, { useState } from "react";
import styled from "styled-components";
import {
    SQUARE_DIMS, DIMS, PLAYER_O, PLAYER_X,
    getRandomInt,
} from "utils";

import Square from "./Square";

const arr = new Array(DIMS ** 2).fill(null);

const Board = ({ players }) => {
    const [grid, setGrid] = useState(arr);
    // const [players, setPlayers] = useState({
    //     human: PLAYER_X,
    //     computer: PLAYER_O
    // });

    const move = (index, player) => {
        setGrid(grid => {
            const gridCopy = grid.concat();
            gridCopy[index] = player;

            console.log(gridCopy)
            return gridCopy;
        });
    };

    const computerMove = () => {
        let index = getRandomInt(0, 8);
        while (grid[index]) {
            index = getRandomInt(0, 8);
        }
        move(index, players.computer);
    };

    const humanMove = index => {
        if (!grid[index]) {
            move(index, players.human);
            computerMove();
        }
    };

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
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;

export default Board;
