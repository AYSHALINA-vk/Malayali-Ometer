import React from 'react';
import { Play, Palmtree, Waves } from 'lucide-react';

interface HomeScreenProps {
  onStartQuiz: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-8 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://keralataxis.com/wp-content/uploads/2024/04/Traditional-Kerala-Houseboat.webp')", // Kerala houseboat image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Kerala themed overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-yellow-900/20 to-yellow-100/10 pointer-events-none"></div>
      {/* Coconut tree decorations */}
      <div className="absolute top-10 left-10 text-green-200 opacity-50">
        <Palmtree size={60} />
      </div>
      <div className="absolute top-24 right-16 text-green-200 opacity-50">
        <Palmtree size={50} />
      </div>
      <div className="absolute bottom-16 left-20 text-green-200 opacity-50">
        <Palmtree size={40} />
      </div>
      <div className="absolute bottom-10 right-1/2 text-blue-900 opacity-70 text-6xl select-none">
        🚤 {/* Boat emoji for extra Kerala vibe */}
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-yellow-600 leading-tight">
            🥥 Malayali-ometer 🥥
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Are You Truly Malayali?
            <br />
            <span className="text-lg md:text-xl text-gray-600 font-normal">
              Find Out Now! 
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-200">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Answer a few questions. Play some games. Get wildly inaccurate results.
            <br />
            <span className="text-base text-gray-500 italic">
              No real cultural value guaranteed! 😄
            </span>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-green-100 rounded-xl p-4 border-2 border-green-200">
            <div className="text-2xl mb-2">🍌</div>
            <div className="font-semibold text-green-800">Fun Quiz</div>
            <div className="text-green-600">5 hilarious questions</div>
          </div>
          <div className="bg-blue-100 rounded-xl p-4 border-2 border-blue-200">
            <div className="text-2xl mb-2">🎮</div>
            <div className="font-semibold text-blue-800">Mini Games</div>
            <div className="text-blue-600">Test your Kerala skills</div>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold text-yellow-800">Certificate</div>
            <div className="text-yellow-600">Share your results</div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <button
            onClick={onStartQuiz}
            className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 md:py-5 md:px-12 rounded-2xl text-xl md:text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400"
          >
            <div className="flex items-center justify-center space-x-3">
              <Play className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
              <span>Start Your Journey!</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-gray-500 text-sm">
          <p>Built with ❤️ for Kerala vibes and pure entertainment</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;