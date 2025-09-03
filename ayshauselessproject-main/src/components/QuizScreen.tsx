import React, { useState } from 'react';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { QuizData, Question } from '../types/quiz';
import { quizQuestions } from '../data/questions';

interface QuizScreenProps {
  onQuizComplete: () => void;
  onUpdateData: (data: Partial<QuizData>) => void;
  quizData: QuizData;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onQuizComplete, onUpdateData, quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleNext = () => {
    if (currentAnswer !== '') {
      const newAnswers = { ...quizData.answers, [question.id]: currentAnswer };
      onUpdateData({ answers: newAnswers });

      if (isLastQuestion) {
        onQuizComplete();
      } else {
        setCurrentQuestion(prev => prev + 1);
        setCurrentAnswer('');
      }
    }
  };

  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {q.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnswer(option)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  currentAnswer === option
                    ? 'border-green-500 bg-green-50 text-green-800 shadow-lg'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    currentAnswer === option ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}>
                    {currentAnswer === option && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 rounded-xl p-6">
              <input
                type="range"
                min={q.min || 0}
                max={q.max || 100}
                value={currentAnswer || q.min || 0}
                onChange={(e) => setCurrentAnswer(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{q.sliderLabels?.min}</span>
                <span className="font-bold text-lg text-green-600">{currentAnswer || q.min || 0}</span>
                <span>{q.sliderLabels?.max}</span>
              </div>
            </div>
          </div>
        );

      case 'image-select':
        return (
          <div className="grid grid-cols-2 gap-4">
            {q.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnswer(image.value)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentAnswer === image.value
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-6xl mb-3">{image.src}</div>
                <div className="font-medium text-gray-800">{image.label}</div>
                {currentAnswer === image.value && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage:
          "url('https://assets.shortpedia.com/uploads/2021/08/09/1628501635.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center space-x-2 text-gray-600">
              <BarChart3 size={16} />
              <span className="text-sm">Quiz Progress</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-green-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          {renderQuestion(question)}

          {/* Next Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNext}
              disabled={currentAnswer === ''}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                currentAnswer !== ''
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'Start Games!' : 'Next Question'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;