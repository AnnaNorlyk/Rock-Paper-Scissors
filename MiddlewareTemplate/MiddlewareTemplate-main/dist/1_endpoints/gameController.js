import { Moves } from '../3_models/Moves.js';
import { Results } from '../3_models/Results.js';
import { GameState } from '../3_models/GameState.js';
// Keep single instance in memory for single user (example):
let currentGameState = null;
// Example: choose random move
function getRandomMove() {
    const moves = [Moves.ROCK, Moves.PAPER, Moves.SCISSORS];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
// Example: determine winner
function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove)
        return Results.DRAW;
    if ((playerMove === Moves.ROCK && computerMove === Moves.SCISSORS) ||
        (playerMove === Moves.PAPER && computerMove === Moves.ROCK) ||
        (playerMove === Moves.SCISSORS && computerMove === Moves.PAPER)) {
        return Results.WIN;
    }
    return Results.LOSS;
}
export const startGame = (req, res) => {
    const { name } = req.params;
    currentGameState = new GameState(name);
    return res.json({ message: `Game started for ${name}` });
};
export const playGame = (req, res) => {
    if (!currentGameState) {
        return res.status(400).json({ error: 'No active game. Please start first.' });
    }
    const { valg } = req.params;
    const playerMove = valg?.toLowerCase();
    const computerMove = getRandomMove();
    const outcome = determineWinner(playerMove, computerMove);
    // Update stats
    if (outcome === Results.WIN)
        currentGameState.wins++;
    else if (outcome === Results.DRAW)
        currentGameState.draws++;
    else
        currentGameState.losses++;
    res.json({
        playerMove,
        computerMove,
        outcome,
        stats: {
            wins: currentGameState.wins,
            draws: currentGameState.draws,
            losses: currentGameState.losses,
        },
    });
};
export const stopGame = (req, res) => {
    if (!currentGameState) {
        return res.status(400).json({ error: 'No active game to stop.' });
    }
    const finalStats = {
        playerName: currentGameState.playerName,
        wins: currentGameState.wins,
        draws: currentGameState.draws,
        losses: currentGameState.losses,
    };
    currentGameState.reset();
    currentGameState = null;
    return res.json(finalStats);
};
//# sourceMappingURL=gameController.js.map