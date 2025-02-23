import express from 'express';
import { routes } from './0_routes/routes.js';
const app = express();
const port = 3000;
app.use('/', routes);
app.listen(port, () => {
    console.log('This server is listening at port:' + port);
});
//# sourceMappingURL=launch.js.map