import express from 'express';
import { routes } from './0_routes/routes.js';
import { logger } from './5_Logging/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Logging
app.use(logger);


app.use('/', routes);

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
