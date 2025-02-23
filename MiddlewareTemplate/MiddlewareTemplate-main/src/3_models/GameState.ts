export class GameState {
    public playerName: string;
    public wins: number;
    public losses: number;
    public draws: number;
  
    constructor(playerName: string) {
      this.playerName = playerName;
      this.wins = 0;
      this.losses = 0;
      this.draws = 0;
    }
  
    public reset(): void {
      this.wins = 0;
      this.losses = 0;
      this.draws = 0;
      this.playerName = '';
    }
  }
  