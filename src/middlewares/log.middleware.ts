import * as express from 'express';

import { logger } from '../lib/logger';

export const logMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info('REQUEST', {
    url: req.url,
    queryParams: req.query,
    body: req.body
  });
  next();
};