// logger.ts
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
// Create a write stream (in append mode) for logging to a file (optional)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs', 'access.log'), { flags: 'a' });
// Logger to a file using "combined" format
export const loggerToFile = morgan('combined', {
    stream: accessLogStream,
});
// Logger to console using "dev" format
export const loggerToConsole = morgan('dev');
//# sourceMappingURL=logger.js.map