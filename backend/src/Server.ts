import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';

import ApiRouter from './routes';


// Load env
config();

// Set CORS options
const corsOptions: cors.CorsOptions = process.env.NODE_ENV === 'production' ? { origin: process.env.CORS_ORIGIN } : { origin: '*' };

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'production') {
    // Security
    app.use(helmet());
} else {
    // Show routes called in console during development
    app.use(morgan('dev'));
}

// Add APIs
app.use('/api', ApiRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json((err.message));
});

// Export express instance
export default app;