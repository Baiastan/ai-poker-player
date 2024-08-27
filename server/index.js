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
  modelName: 'gpt-3.5-turbo',
});

app.post('/api/ai/poker', async (req, res) => {
  const data = req.body;

  const { hand, flop, turn, river } = cardsToString(data);

  let gameStage = 'Preflop';
  if (flop && !turn && !river) {
    gameStage = 'Flop';
  } else if (flop && turn && !river) {
    gameStage = 'Turn';
  } else if (flop && turn && river) {
    gameStage = 'River';
  }

  const promt = PromptTemplate.fromTemplate(
    `Keep in mind: Variant of the poker - Texas Hold'em. The current game stage is ${gameStage}. 
    How strong is my hand with {hand}? ${
      gameStage === 'Flop' ? 'Flop cards: {flop}.' : ''
    } 
    ${gameStage === 'Turn' ? 'Turn card: {turn}.' : ''} 
    ${gameStage === 'River' ? 'River card: {river}.' : ''} 
    Number of players: {numberOfPlayers}. Make it a short and precise answer.`,
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

  console.log(responseFromGpt);

  res.json({ message: responseFromGpt });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
