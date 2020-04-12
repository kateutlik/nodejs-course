import * as express from 'express';
import { HttpError } from 'routing-controllers';

import { logger } from '../lib/logger';
import httpStatus from 'http-status';

export const errorMiddleware = (error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(error.httpCode || httpStatus.BAD_REQUEST);
  res.json({
    name: error.name,
    message: error.message,
  });

  logger.error(error.name, {
    url: req.url,
    queryParams: req.query,
    body: req.body
  });
};
