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

  console.log('DATA: ', data);

  let gameStage = 'Preflop';
  if (flop && !turn && !river) {
    gameStage = 'Flop';
  } else if (flop && turn && !river) {
    gameStage = 'Turn';
  } else if (flop && turn && river) {
    gameStage = 'River';
  }

  const promt = PromptTemplate.fromTemplate(
    `You are an expert in Texas Hold'em poker, which is a popular poker variant. 
    In this game, players receive two private cards (known as 'hole cards') and then use five community cards to make the best possible five-card poker hand.
    The possible hands range from high card (lowest) to royal flush (highest). 
    The hand strength is calculated based on these poker rules.

    The current game stage is ${gameStage}. 
    - If no cards are on the table, it is called 'Preflop'. 
    - If three community cards are on the table, it is the 'Flop'. 
    - If there are four community cards, it is the 'Turn'. 
    - If there are five community cards, it is the 'River'.

    Now, based on the following information, please provide a short and accurate analysis of how strong my hand is:
    - Hole cards: {hand}
    - ${gameStage === 'Flop' ? 'Flop cards: {flop}.' : ''}
    - ${gameStage === 'Turn' ? 'Turn card: {turn}.' : ''}
    - ${gameStage === 'River' ? 'River card: {river}.' : ''}
    - Number of players: 6

    Give a short, precise assessment of the hand strength, considering the rules and strategies of Texas Hold'em.`,
  );

  const formattedPromt = await promt.format({
    hand,
    flop: flop ? `Flop is ${flop}` : 'Flop is yet to come',
    turn: turn ? `Turn is ${turn}` : 'Turn is yet to come',
    river: river ? `River is ${river}` : 'River is yet to come',
    numberOfPlayers: 6,
  });

  const responseFromGpt = await llm.invoke(formattedPromt);

  console.log(responseFromGpt);

  res.json({ message: responseFromGpt });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
