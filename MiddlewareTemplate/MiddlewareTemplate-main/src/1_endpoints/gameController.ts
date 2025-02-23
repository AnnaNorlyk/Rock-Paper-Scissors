import { Request, Response } from 'express';
import { Moves } from '../3_models/Moves.js';
import { Results } from '../3_models/Results.js';
import { GameState } from '../3_models/GameState.js';

let currentGameState: GameState | null = null; // Stores game state

// Picks a random move for the computer
function getRandomMove(): Moves {
  const moves = [Moves.ROCK, Moves.PAPER, Moves.SCISSORS];
  return moves[Math.floor(Math.random() * moves.length)];
}

// Determines winner based on game rules
function determineWinner(playerMove: Moves, computerMove: Moves): Results {
  if (playerMove === computerMove) return Results.DRAW;
  return (playerMove === Moves.ROCK && computerMove === Moves.SCISSORS) ||
         (playerMove === Moves.PAPER && computerMove === Moves.ROCK) ||
         (playerMove === Moves.SCISSORS && computerMove === Moves.PAPER)
         ? Results.WIN
         : Results.LOSS;
}

// Starts a new game
export const startGame = (req: Request, res: Response) => {
  currentGameState = new GameState(req.params.name);
  res.json({ message: `Game started for ${req.params.name}` });
};

// Handles the player's move
export const playGame = (req: Request, res: Response) => {
  if (!currentGameState) {
    return res.status(400).json({ error: 'Start a game first.' });
  }

  const playerMove = req.params.valg.toLowerCase() as Moves;
  const computerMove = getRandomMove();
  const outcome = determineWinner(playerMove, computerMove);

  // Update statistics
  if (outcome === Results.WIN) currentGameState.wins++;
  else if (outcome === Results.DRAW) currentGameState.draws++;
  else currentGameState.losses++;

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

// Stops the game and returns final stats
export const stopGame = (req: Request, res: Response) => {
  if (!currentGameState) {
    return res.status(400).json({ error: 'No active game to stop...' });
  }

  const finalStats = {
    playerName: currentGameState.playerName,
    wins: currentGameState.wins,
    draws: currentGameState.draws,
    losses: currentGameState.losses,
  };

  currentGameState.reset();
  currentGameState = null;

  res.json(finalStats);
};
