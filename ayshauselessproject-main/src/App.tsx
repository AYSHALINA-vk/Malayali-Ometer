import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import AboutScreen from './components/AboutScreen';
import Navigation from './components/Navigation';
import { QuizData } from './types/quiz';

type Screen = 'home' | 'quiz' | 'games' | 'results' | 'about';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [quizData, setQuizData] = useState<QuizData>({
    answers: {},
    gameScores: {},
    totalScore: 0,
    completed: false
  });

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
  };

  const resetQuiz = () => {
    setQuizData({
      answers: {},
      gameScores: {},
      totalScore: 0,
      completed: false
    });
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStartQuiz={() => navigateToScreen('quiz')} />;
      case 'quiz':
        return (
          <QuizScreen
            onQuizComplete={() => navigateToScreen('games')}
            onUpdateData={updateQuizData}
            quizData={quizData}
          />
        );
      case 'games':
        return (
          <GameScreen
            onGamesComplete={() => navigateToScreen('results')}
            onUpdateData={updateQuizData}
            quizData={quizData}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            quizData={quizData}
            onTryAgain={resetQuiz}
            onNavigate={navigateToScreen}
          />
        );
      case 'about':
        return <AboutScreen onBack={() => navigateToScreen('home')} />;
      default:
        return <HomeScreen onStartQuiz={() => navigateToScreen('quiz')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-yellow-50">
      <Navigation
        currentScreen={currentScreen}
        onNavigate={navigateToScreen}
        showNav={currentScreen !== 'quiz' && currentScreen !== 'games'}
      />
      <main className="transition-all duration-500 ease-in-out">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;