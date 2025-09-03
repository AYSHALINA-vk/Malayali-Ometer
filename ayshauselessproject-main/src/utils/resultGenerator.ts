import { QuizData } from '../types/quiz';

interface ResultData {
  score: number;
  title: string;
  description: string;
  fact: string;
  badge: string;
}

const titles = [
  'Coconut Tree in Human Form',
  'Honorary Backwater Navigator',
  'Undercover Malayali Agent',
  'Certified Fish Curry Connoisseur',
  'Professional Monsoon Dancer',
  'Walking Kerala Tourism Board',
  'Human Embodiment of Sadhya',
  'Kathakali Mask Enthusiast',
  'Banana Leaf Sommelier',
  'Certified Coconut Climber'
];

const descriptions = [
  'You are half a coconut tree, half a Mammootty stare, and completely confused about your cultural identity.',
  'Your DNA is 73% coconut oil, 15% fish curry, and 12% monsoon rainwater.',
  'You dream in Malayalam but think in English and speak in confused gestures.',
  'You can spot a non-Malayali from 3 kilometers away but still get lost in your own neighborhood.',
  'Your superpowers include detecting coconut oil quality and predicting monsoon patterns.',
  'You are basically a walking advertisement for Kerala tourism without the government salary.',
  'Your ideal vacation is visiting your own backyard because it looks like Alleppey.',
  'You measure distances in terms of how many coconut trees you pass, not kilometers.',
  'Your cooking style is "add coconut until it tastes like home" regardless of the recipe.',
  'You have strong opinions about the correct way to eat banana chips and will fight about it.'
];

const facts = [
  'Did you know Kerala has more coconuts than Wi-Fi signals? (This is completely made up)',
  'Scientists believe that Malayalis can photosynthesize using coconut oil instead of sunlight.',
  'The average Malayali can identify 47 different types of fish curry by smell alone.',
  'Kerala is the only place where monsoons are considered a personality trait.',
  'Banana leaves are actually portals to other dimensions, but only Malayalis know this.',
  'The word "coconut" was invented by a Malayali who was tired of saying "narikel" all the time.',
  'Every coconut tree in Kerala is connected to a secret underground network of gossip.',
  'Malayalis are born with an internal spice meter that goes up to "nuclear fusion level".',
  'The backwaters of Kerala are actually just giant outdoor bathtubs for coconut trees.',
  'Studies show that 99% of Malayalis can navigate by the smell of fish curry alone.'
];

const badges = [
  'Coconut Whisperer 🥥',
  'Monsoon Master 🌧️',
  'Spice Commander 🌶️',
  'Backwater Admiral ⛵',
  'Sadhya Sergeant 🍛',
  'Kathakali Captain 🎭',
  'Fish Curry General 🐟',
  'Banana Leaf Major 🍃',
  'Coconut Oil Colonel 🥥',
  'Malayalam Movie Expert 🎬'
];

export const generateResult = (quizData: QuizData): ResultData => {
  // Generate a semi-random score based on quiz data
  const baseScore = Math.floor(Math.random() * 40) + 30; // 30-70 base
  const quizBonus = Object.keys(quizData.answers).length * 2; // Up to 10 points
  const gameBonus = Math.min(quizData.totalScore / 10, 20); // Up to 20 points from games
  
  const totalScore = Math.min(100, Math.max(10, baseScore + quizBonus + gameBonus));
  
  // Select random descriptions but make them consistent per session
  const titleIndex = totalScore % titles.length;
  const descIndex = totalScore % descriptions.length;
  const factIndex = (totalScore + 3) % facts.length;
  const badgeIndex = totalScore % badges.length;
  
  return {
    score: Math.round(totalScore),
    title: titles[titleIndex],
    description: descriptions[descIndex],
    fact: facts[factIndex],
    badge: badges[badgeIndex]
  };
};