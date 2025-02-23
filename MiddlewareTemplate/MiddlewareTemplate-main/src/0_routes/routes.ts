import { Router } from 'express';
import { gameRoutes } from './GameRoutes.js';

const routes = Router();


routes.use('/', gameRoutes);


routes.all('*', (req, res) => {
  return res.status(404).send('No such route');
});

export { routes };

