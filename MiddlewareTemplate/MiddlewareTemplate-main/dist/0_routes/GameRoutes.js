import { Router } from 'express';
import { startGame, playGame, stopGame } from '../1_endpoints/gameController.js';
const gameRoutes = Router();
gameRoutes.get('/start/:name', startGame);
gameRoutes.get('/play/:valg', playGame);
gameRoutes.get('/stop', stopGame);
export { gameRoutes };
//# sourceMappingURL=GameRoutes.js.map