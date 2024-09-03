import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cors from 'cors';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import {
  cardsToString,
  evaluateHandStrength,
  getHandCardStrength,
  getHandIndicator,
} from './utils.js';

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10,
  message: 'You have exceeded the 10 requests in 24 hrs limit!',
  headers: true,
});

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
});

app.post('/api/ai/poker', limiter, async (req, res) => {
  const data = req.body;

  const { stringPoker, objectPoker } = cardsToString(data);

  const { hand, flop, turn, river } = objectPoker;

  let gameStage = 'Preflop';
  if (flop && !turn && !river) {
    gameStage = 'Flop';
  } else if (flop && turn && !river) {
    gameStage = 'Turn';
  } else if (flop && turn && river) {
    gameStage = 'River';
  }

  const handStrength = getHandCardStrength(hand);

  const indicator = getHandIndicator(handStrength);

  const currentRank = evaluateHandStrength(data);

  const prompt = PromptTemplate.fromTemplate(
    `You are an expert in Texas Hold'em poker, which is a popular poker variant.
    In this game, players receive two private cards (known as 'hole cards') and then use five community cards to make the best possible five-card poker hand.
    The possible hands range from high card (lowest) to royal flush (highest).
    The hand strength is calculated based on these poker rules.

    Hand Rankings
    From highest to lowest:

    1. Royal Flush: A, K, Q, J, 10, all of the same suit.
    2. Straight Flush: Five consecutive cards of the same suit.
    3. Four of a Kind (Quads): Four cards of the same rank.
    4. Full House: Three cards of one rank and two cards of another rank.
    5. Flush: Five cards of the same suit, not in sequence.
    6. Straight: Five consecutive cards of different suits.
    7. Three of a Kind (Trips/Set): Three cards of the same rank.
    8. Two Pair: Two cards of one rank, two cards of another rank.
    9. One Pair: Two cards of the same rank.
    10. High Card: The highest card when no other hand is made.

    The current game stage is {gameStage}.
    - If no cards are on the table, it is called 'Preflop'.
    - If three community cards are on the table, it is the 'Flop'.
    - If there are four community cards, it is the 'Turn'.
    - If there are five community cards, it is the 'River'.

    Now, based on the following information, please provide a short and accurate analysis of how strong my hand is:
      currenRank: {currentRank},
      holeCardsStrength: {handStrength}
      cards on my hand: {hand}

      Make it short and precise
   `,
  );

  const formattedPromt = await prompt.format({
    hand,
    handStrength,
    currentRank,
    gameStage,
    flop: flop ? `Flop is ${flop}` : 'Flop is yet to come',
    turn: turn ? `Turn is ${turn}` : 'Turn is yet to come',
    river: river ? `River is ${river}` : 'River is yet to come',
    numberOfPlayers: 6,
  });

  const responseFromGpt = await llm.invoke(formattedPromt);

  res.json({
    data: {
      handStrength,
      currentRank,
      params: indicator,
      aiSuggestion: responseFromGpt,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
