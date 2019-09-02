import React from "react";
import styled from "styled-components";
import { SQUARE_DIMS } from "utils";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SQUARE_DIMS}px;
  height: ${SQUARE_DIMS}px;
  font-size: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Square = props => {
    const { value, ...rest } = props;

    return (
        <Button
            onClick={() => rest.onClick()}>
            {rest.isActive && value}
        </Button>
    );
}

export default Square;
