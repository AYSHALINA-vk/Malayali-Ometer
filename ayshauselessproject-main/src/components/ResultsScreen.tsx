import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Share2, Download, Star } from 'lucide-react';
import { QuizData } from '../types/quiz';
import Certificate from './Certificate';
import { generateResult } from '../utils/resultGenerator';

interface ResultsScreenProps {
  quizData: QuizData;
  onTryAgain: () => void;
  onNavigate: (screen: string) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ quizData, onTryAgain, onNavigate }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Generate result based on quiz data
    const generatedResult = generateResult(quizData);
    setResult(generatedResult);
    
    // Trigger confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, [quizData]);

  const shareResult = async () => {
    const text = `I scored ${result?.score}% on the Malayali-ometer! 🥥 ${result?.title} Check out this hilarious Kerala personality quiz!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Malayali-ometer Result',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Result copied to clipboard!');
    });
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Calculating your Malayali score...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              {['🥥', '🌴', '🍌', '🎭', '🛶'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Main Result */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-green-200">
          <div className="space-y-6">
            <Trophy className="mx-auto text-yellow-500" size={80} />
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {result.score}%
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                You are {result.score}% Malayali!
              </h2>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{result.title}</h3>
                <p className="text-lg text-gray-700">{result.description}</p>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Star size={20} />
              <span>{result.badge}</span>
            </div>
          </div>
        </div>

        {/* Kerala Fact */}
        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            🧠 Random Kerala "Fact":
          </h3>
          <p className="text-lg text-blue-700 italic">{result.fact}</p>
        </div>

        {/* Game Scores Breakdown */}
        <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">Your Performance:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-semibold">Quiz Answers</div>
              <div className="text-yellow-700">{Object.keys(quizData.answers).length}/5 questions</div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Games Played</div>
              <div className="text-yellow-700">{Object.keys(quizData.gameScores).length}/3 games</div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Total Game Score</div>
              <div className="text-yellow-700">{quizData.totalScore} points</div>
            </div>
          </div>
        </div>

        {/* Fake Leaderboard */}
        <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">🏆 Today's Leaderboard (Totally Real):</h3>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex justify-between bg-white rounded-lg p-3">
              <span>1. Sajimon</span>
              <span className="font-bold text-purple-600">92%</span>
            </div>
            <div className="flex justify-between bg-white rounded-lg p-3">
              <span>2. Ammu</span>
              <span className="font-bold text-purple-600">87%</span>
            </div>
            <div className="flex justify-between bg-purple-100 rounded-lg p-3 border-2 border-purple-300">
              <span>3. You!</span>
              <span className="font-bold text-purple-700">{result.score}%</span>
            </div>
            <div className="flex justify-between bg-white rounded-lg p-3">
              <span>4. Ravi</span>
              <span className="font-bold text-purple-600">73%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onTryAgain}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw size={20} />
            <span>Try Again</span>
          </button>

          <button
            onClick={shareResult}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Share2 size={20} />
            <span>Share Result</span>
          </button>

          <button
            onClick={() => setShowCertificate(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Download size={20} />
            <span>Get Certificate</span>
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate
          result={result}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default ResultsScreen;