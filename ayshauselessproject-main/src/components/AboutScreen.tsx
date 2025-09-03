import React from 'react';
import { ArrowLeft, Heart, Code, Laugh } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-8 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdTAUluDs7ra9fqC1oZkAV57cQvXq3k9_om_ygdKP3tKFoi1lpJRJX3nzjcIzLXoBXas&usqp=CAU')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-10 left-10 text-green-200 opacity-30 text-8xl">🌴</div>
      <div className="absolute bottom-10 right-10 text-blue-200 opacity-30 text-8xl">🛶</div>
      <div className="absolute top-1/3 right-20 text-yellow-200 opacity-30 text-6xl">🥥</div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-green-200">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            About Malayali-ometer
          </h1>
          <p className="text-xl text-gray-700 italic">
            The most scientifically inaccurate personality quiz ever created! 🤪
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What is this? */}
          <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
            <div className="flex items-center justify-center mb-4">
              <Laugh className="text-yellow-600" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">What is this?</h2>
            <p className="text-gray-700 leading-relaxed">
              This quiz does absolutely nothing useful and that's exactly the point! 
              It's a hilarious celebration of Kerala's culture, stereotypes, and memes 
              with zero scientific backing but maximum entertainment value.
            </p>
          </div>

          {/* Purpose */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-blue-600" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Built with Love</h2>
            <p className="text-gray-700 leading-relaxed">
              Created to bring smiles, celebrate Kerala's vibrant culture, and prove 
              that not everything on the internet needs to be serious. Sometimes, 
              pure fun is the best purpose!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-6">What You Get:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-green-700 mb-2">5 Fun Questions</h3>
              <p className="text-sm text-gray-600">Multiple choice, sliders, and image selections</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-lg font-bold text-green-700 mb-2">3 Mini Games</h3>
              <p className="text-sm text-gray-600">Banana chips, sadhya sorting, and movie quiz</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-green-700 mb-2">Shareable Results</h3>
              <p className="text-sm text-gray-600">Certificate and social media sharing</p>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Important Disclaimers:</h2>
          <div className="text-left space-y-2 text-gray-700">
            <p>• This quiz has no scientific validity whatsoever</p>
            <p>• Results are randomly generated for entertainment only</p>
            <p>• No actual cultural assessment is performed</p>
            <p>• We love all Malayalis equally (and non-Malayalis too!)</p>
            <p>• Any resemblance to real personality traits is purely coincidental</p>
            <p>• May cause uncontrollable laughter and excessive sharing</p>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-center mb-4">
            <Code className="text-purple-600" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Made For Fun</h2>
          <p className="text-gray-700 mb-4">
            Built for a hackathon with React, TypeScript, Tailwind CSS, and lots of Kerala love.
          </p>
          <p className="text-sm text-gray-600 italic">
            "The best code is the code that makes people smile!" - Anonymous Developer
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mx-auto"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;