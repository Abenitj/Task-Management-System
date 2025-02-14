import express from 'express'; // Use import
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, World! (ES Modules)');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});