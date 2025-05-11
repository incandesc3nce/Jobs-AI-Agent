import { app } from './server/express';

const port = process.env['PORT'] || 3000;

app.listen(port, () => {
  console.log(`🔥 Server is running:\n http://localhost:${port}/api/`);
});
