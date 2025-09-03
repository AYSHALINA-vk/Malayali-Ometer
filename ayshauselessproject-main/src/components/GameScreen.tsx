import React, { useState, useEffect } from 'react';
import { Trophy, Timer, ArrowRight } from 'lucide-react';
import { QuizData } from '../types/quiz';
import BananaChipGame from './games/BananaChipGame';
import SadhyaSorterGame from './games/SadhyaSorterGame';
import MovieQuizGame from './games/MovieQuizGame';

interface GameScreenProps {
  onGamesComplete: () => void;
  onUpdateData: (data: Partial<QuizData>) => void;
  quizData: QuizData;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGamesComplete, onUpdateData, quizData }) => {
  const [currentGame, setCurrentGame] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameScores, setGameScores] = useState<Record<string, number>>({});

  const games = [
    {
      id: 'banana-chips',
      title: 'Catch the Banana Chips!',
      description: 'Use your Kerala reflexes to catch falling banana chips!',
      emoji: '🍌',
      component: BananaChipGame
    },
    {
      id: 'sadhya-sorter',
      title: 'Sadhya Sequence Master',
      description: 'Arrange the perfect Onam sadhya in the right order!',
      emoji: '🍛',
      component: SadhyaSorterGame
    },
    {
      id: 'movie-quiz',
      title: 'Malayalam Movie Expert',
      description: 'Identify iconic Malayalam movies from scenes and dialogues!',
      emoji: '🎬',
      component: MovieQuizGame
    }
  ];

  const currentGameData = games[currentGame];
  const isLastGame = currentGame === games.length - 1;

  const handleGameComplete = (score: number) => {
    const newScores = { ...gameScores, [currentGameData.id]: score };
    setGameScores(newScores);
    
    if (isLastGame) {
      // Calculate total score and complete
      const totalGameScore = Object.values(newScores).reduce((sum, score) => sum + score, 0);
      onUpdateData({ 
        gameScores: newScores, 
        totalScore: totalGameScore,
        completed: true 
      });
      setTimeout(() => onGamesComplete(), 2000);
    } else {
      setTimeout(() => {
        setCurrentGame(prev => prev + 1);
        setGameStarted(false);
      }, 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Trophy className="text-yellow-500" size={24} />
              <span className="text-lg font-bold text-gray-700">
                Game {currentGame + 1} of {games.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentGame + 1) / games.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Game Preview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-yellow-200">
            <div className="text-8xl mb-6">{currentGameData.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentGameData.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {currentGameData.description}
            </p>

            {/* Previous Scores */}
            {Object.keys(gameScores).length > 0 && (
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-green-800 mb-2">Previous Scores:</h3>
                <div className="space-y-1">
                  {Object.entries(gameScores).map(([gameId, score]) => {
                    const game = games.find(g => g.id === gameId);
                    return (
                      <div key={gameId} className="flex justify-between text-sm">
                        <span>{game?.title}</span>
                        <span className="font-bold">{score} points</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <Timer size={24} />
                <span>Start Game!</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const GameComponent = currentGameData.component;
  return (
    <div className="min-h-screen">
      <GameComponent onComplete={handleGameComplete} />
    </div>
  );
};

export default GameScreen;