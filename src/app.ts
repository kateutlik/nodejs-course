import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import { logMiddleware } from './middlewares/log.middleware';
import { errorMiddleware } from './middlewares/error.handler.middleware';

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './log/access.log'),
  { flags: 'a' }
);

const app : express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logMiddleware);

app.use(
  morgan('combined', {
    stream: accessLogStream
  })
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorMiddleware);

export default app;
