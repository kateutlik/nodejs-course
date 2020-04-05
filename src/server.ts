import { PORT } from './common/config';
import app from './app';

console.log(PORT)
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
