// gameState.ts
export class GameState {
    playerName;
    wins;
    losses;
    draws;
    constructor(playerName) {
        this.playerName = playerName;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }
    reset() {
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.playerName = '';
    }
}
//# sourceMappingURL=GameState.js.map