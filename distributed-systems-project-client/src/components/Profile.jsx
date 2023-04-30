import { useEffect, useState } from "react";
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Square = (props) => {
    const { value, onSquareClick } = props;
    return <button className={`square square-${value}`} onClick={onSquareClick}>{value ? value : "🙂"}</button>;
};

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("")
    const [winner, setWinner] = useState("")

    const handleClick = (i) => {
        if (squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
    }

    const calculateWinner = (squares) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null;
    }

    const handleStatus = (squares) => {
        const winner = calculateWinner(squares)
        if (winner) {
            setStatus("Winner")
            setWinner(winner)
        } else {
            setStatus("Next move")
        }
    }

    useEffect(() => {
        handleStatus(squares)
    }, [squares])

    const refreshBoard = () => {
        setSquares(Array(9).fill(null))
        setXIsNext(true)
    }

    return (
        <div className="game">
            <div className="profile-banner">
                <div className="status">
                    {status === "Winner" ? (
                        <span>
                            Winner : <span className={`status-winner status-winner-${winner}`}>{winner}</span> <span className="status-winner-logo">🔥</span>
                        </span>
                    ) : (
                        <span>
                            Next move :{" "}
                            <span className={`status-winner status-winner-${xIsNext}`}>{xIsNext ? "X" : "O"}</span> <span className="status-winner-logo">🐵</span>
                        </span>
                    )}
                </div>

            </div>
            <div className="game-board">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
            <div><button className="refresh-button" onClick={() => refreshBoard()}>Refresh board</button></div>
        </div>
    )
}

const WelcomeSection = (props) => {
    const { username } = props;
    return (
        <div className="welcome-section">
            <h1>Welcome {username} 👋</h1>
        </div>
    )
}

const Profile = () => {
    const { isAuthenticated, userData } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [])
    return (
        <div className="profile">
            <WelcomeSection username={userData.username} />
            <Game />
        </div>
    )
}

export default Profile;