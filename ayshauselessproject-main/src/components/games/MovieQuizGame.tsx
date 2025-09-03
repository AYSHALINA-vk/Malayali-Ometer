import React, { useState, useEffect } from 'react';
import { Trophy, Film } from 'lucide-react';

interface MovieQuizGameProps {
  onComplete: (score: number) => void;
}

interface MovieQuestion {
  id: number;
  image: string;
  dialogue: string;
  options: string[];
  correct: number;
}

const movieQuestions: MovieQuestion[] = [
  {
    id: 1,
    image: '🎭',
    dialogue: '"Nee Po Mone Dinesha!"',
    options: ['Spadikam', 'Drishyam', 'Kilukkam'],
    correct: 0
  },
  {
    id: 2,
    image: '🚗',
    dialogue: '"Georgekutty vanno?"',
    options: ['Punjabi House', 'Drishyam', 'Classmates'],
    correct: 1
  },
  {
    id: 3,
    image: '👑',
    dialogue: '"Njan Mohanlal alle?"',
    options: ['Lucifer', 'Narasimham', 'Devasuram'],
    correct: 2
  },
  {
    id: 4,
    image: '🌊',
    dialogue: '"Avasanam"',
    options: ['Thanmathra', 'Dasarath', 'Spirit'],
    correct: 0
  },
  {
    id: 5,
    image: '🏠',
    dialogue: '"Mone Paul, chumma oru show kaanicho"',
    options: ['Big B', 'Christian Brothers', 'Twenty:20'],
    correct: 0
  }
];

const MovieQuizGame: React.FC<MovieQuizGameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameActive, setGameActive] = useState(true);

  const question = movieQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === movieQuestions.length - 1;

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (isLastQuestion) {
            setGameActive(false);
            onComplete(score * 20); // Each correct answer = 20 points
          } else {
            handleNext();
          }
          return 5; // Reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, currentQuestion, score, isLastQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correct) {
      setScore(prev => prev + 1);
    }

    // Auto proceed after showing result
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setGameActive(false);
      onComplete(score * 20);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(5);
    }
  };

  const getButtonColor = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'bg-blue-500 text-white' 
        : 'bg-white hover:bg-blue-50 border-blue-200';
    }
    
    if (index === question.correct) {
      return 'bg-green-500 text-white';
    }
    
    if (selectedAnswer === index && index !== question.correct) {
      return 'bg-red-500 text-white';
    }
    
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-green-600">{score}/{movieQuestions.length}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Film className="text-purple-600" size={24} />
            <span className="text-xl font-bold text-gray-800">Malayalam Movie Quiz</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
            <div className="text-sm text-gray-600">Time</div>
            <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {movieQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / movieQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Movie Scene */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{question.image}</div>
            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-xl font-bold text-gray-800 italic">
                "{question.dialogue}"
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-300 ${getButtonColor(index)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {showResult && index === question.correct && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                  {showResult && selectedAnswer === index && index !== question.correct && (
                    <span className="ml-auto text-red-500">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className="mt-6 text-center">
              <div className={`text-lg font-bold ${selectedAnswer === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                {selectedAnswer === question.correct ? '🎉 Correct!' : '😅 Wrong Answer!'}
              </div>
              <div className="text-gray-600 mt-1">
                {isLastQuestion ? 'Calculating final score...' : 'Next question coming up...'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Over Screen */}
      {!gameActive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-2">Cinema Expert!</h3>
            <p className="text-lg mb-2">
              You got <span className="font-bold text-green-600">{score}</span> out of {movieQuestions.length} correct!
            </p>
            <p className="text-lg mb-4">
              Final Score: <span className="font-bold text-purple-600">{score * 20} points</span>
            </p>
            <p className="text-gray-600">Calculating your Malayali score...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieQuizGame;