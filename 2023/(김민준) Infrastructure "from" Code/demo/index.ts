import { randomUUID } from 'crypto';
import * as express from 'express';

/**
 * @klotho::persist {
 *   id = "tasks"
 * }
 */
const tasks = new Map<string, string>();

const app = express();
app.use(express.json());

// Create a task
app.post('/tasks', async (req, res) => {
  const value = req.body;

  await tasks.set(randomUUID(), value);

  res.status(201).send();
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const data = Object.fromEntries(await tasks.entries());

  res.send(data);
});

// Update a task
app.patch('/tasks/:key', async (req, res) => {
  const key = req.params.key;
  const value = req.body;

  await tasks.set(key, value);

  res.send();
});

// Delete a task
app.delete('/tasks/:key', async (req, res) => {
  const key = req.params.key;

  await tasks.delete(key);

  res.status(204).send();
});

/**
 * @klotho::expose {
 *  id = "app"
 *  target = "public"
 * }
 */
app.listen(3000, () => {
  console.log('Server is up and running at port 3000');
});
