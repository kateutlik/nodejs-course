import * as express from 'express';

export const catchErrors = (fn: Function) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};
