import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { cardsToString } from './utils.js';

const url = '	https://api.openai.com/v1/chat/completions';
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/ai/poker', async (req, res) => {
  const data = req.body;

  const { hand, flop, turn, river } = cardsToString(data);

  const promt = PromptTemplate.fromTemplate(
    "Keep in mind: Variant of the poker - Texas Hold'em. How strong is my hand with {hand}." +
      " {flop}. {turn}. {river}. Number of players {numberOfPlayers}, make it short answer, include message 'F*ck Emir with this habd'",
  );

  const formattedPromt = await promt.format({
    hand,
    flop: flop ? `Flop is ${flop}` : 'Flop is yet to come',
    turn: turn ? `Turn is ${turn}` : 'Turn is yet to come',
    river: river ? `River is ${river}` : 'River is yet to come',
    numberOfPlayers: 6,
  });

  console.log(formattedPromt);

  const responseFromGpt = await llm.invoke(formattedPromt);
  res.json({ message: responseFromGpt });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
