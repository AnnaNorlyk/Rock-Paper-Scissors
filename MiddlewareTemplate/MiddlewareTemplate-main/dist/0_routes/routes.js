import { Router } from 'express';
import { gameRoutes } from './GameRoutes.js';
const routes = Router();
// Mount the game routes at the root (or optionally under /game)
routes.use('/', gameRoutes);
// You can add more sub-routes here if needed
// Wildcard route for everything else
routes.all('*', (req, res) => {
    return res.status(404).send('No such route');
});
export { routes };
//# sourceMappingURL=routes.js.map