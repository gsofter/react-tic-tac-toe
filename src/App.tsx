import React, { useState } from 'react';

interface IItemProps {
  onClick: () => void;
  value: string | null;
}
const Item: React.FC<IItemProps> = ({ onClick, value }) => {
  const itemStyle = {
    background: "lightblue",
    border: "2px solid darkblue",
    fontSize: "30px",
    fontWeight: "800",
    cursor: "pointer",
    outline: "none",
  };

  return <button onClick={onClick} style={itemStyle}> {value} </button>
}

const calculateWinner = (board: Array<string>) => {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a]
  }

  return null
}

// 0 1 2
// 3 4 5
// 6 7 8
export const App: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(false);
  const winner = calculateWinner(board)

  const onItemClick = (id: any) => {
    console.log("Clicked", id)

    const boardCopy = [...board];
    if (boardCopy[id] || winner) return;

    boardCopy[id] = isNextX ? "X" : "O";
    setBoard(boardCopy);
    setIsNextX(!isNextX);
  }

  const boardStyle = {
    border: "4px solid darkblue",
    borderRadius: "10px",
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  };

  return (
    <div>
      <div style={boardStyle}>
        {
          board.map((boardVal, id) => {
            return <Item onClick={() => onItemClick(id)} value={boardVal} />
          })
        }
      </div>
      <div style={{ textAlign: "center" }}>
        Winner: {winner}
      </div>
    </div>
  );
};

export default App;
