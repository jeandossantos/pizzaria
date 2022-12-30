import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { CustomException } from './exceptions/CustomException';

const app = express();
app.use(express.json());
app.use(helmet());

app.use(morgan('dev'));
app.use(
  (
    error: CustomException | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof CustomException) {
      return res.status(error.code).json({
        message: error.message,
        code: error.code,
      });
    }

    console.error(error.message || error);

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);

export { app };
