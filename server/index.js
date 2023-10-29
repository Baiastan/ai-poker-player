import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Fuck you Zama!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
