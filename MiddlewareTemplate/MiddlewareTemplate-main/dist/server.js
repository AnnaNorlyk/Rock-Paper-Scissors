import express from 'express';
import { routes } from './0_routes/routes'; // Adjust path if needed
const app = express();
const PORT = process.env.PORT || 3000;
// Use the 'routes' on the root path
app.use('/', routes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map