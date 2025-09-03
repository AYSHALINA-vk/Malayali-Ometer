import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface SadhyaSorterGameProps {
  onComplete: (score: number) => void;
}

interface Dish {
  id: string;
  name: string;
  emoji: string;
  correctPosition: number;
}

const dishes: Dish[] = [
  { id: 'rice', name: 'Rice', emoji: '🍚', correctPosition: 1 },
  { id: 'parippu', name: 'Parippu', emoji: '🫘', correctPosition: 2 },
  { id: 'sambar', name: 'Sambar', emoji: '🍲', correctPosition: 3 },
  { id: 'rasam', name: 'Rasam', emoji: '🍅', correctPosition: 4 },
  { id: 'avial', name: 'Avial', emoji: '🥬', correctPosition: 5 },
  { id: 'pachadi', name: 'Pachadi', emoji: '🥒', correctPosition: 6 },
  { id: 'payasam', name: 'Payasam', emoji: '🍮', correctPosition: 7 },
  { id: 'pappadam', name: 'Pappadam', emoji: '🍪', correctPosition: 8 }
];

const SadhyaSorterGame: React.FC<SadhyaSorterGameProps> = ({ onComplete }) => {
  const [shuffledDishes, setShuffledDishes] = useState<Dish[]>([]);
  const [playerOrder, setPlayerOrder] = useState<Dish[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [draggedItem, setDraggedItem] = useState<Dish | null>(null);

  // Shuffle dishes on start
  useEffect(() => {
    const shuffled = [...dishes].sort(() => Math.random() - 0.5);
    setShuffledDishes(shuffled);
  }, []);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          calculateScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  const calculateScore = () => {
    let correctPositions = 0;
    playerOrder.forEach((dish, index) => {
      if (dish.correctPosition === index + 1) {
        correctPositions++;
      }
    });
    const score = Math.round((correctPositions / dishes.length) * 100);
    onComplete(score);
  };

  const handleDragStart = (dish: Dish) => {
    setDraggedItem(dish);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem || !gameActive) return;

    const newOrder = [...playerOrder];
    const existingIndex = newOrder.findIndex(d => d.id === draggedItem.id);
    
    if (existingIndex !== -1) {
      newOrder.splice(existingIndex, 1);
    }
    
    newOrder.splice(targetIndex, 0, draggedItem);
    setPlayerOrder(newOrder);
    
    // Remove from shuffled dishes
    setShuffledDishes(prev => prev.filter(d => d.id !== draggedItem.id));
    setDraggedItem(null);
  };

  const handleRemoveFromOrder = (dish: Dish) => {
    if (!gameActive) return;
    
    setPlayerOrder(prev => prev.filter(d => d.id !== dish.id));
    setShuffledDishes(prev => [...prev, dish]);
  };

  const finishEarly = () => {
    if (playerOrder.length === dishes.length) {
      setGameActive(false);
      calculateScore();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-yellow-100 p-4">
      {/* Game UI */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
          <div className="text-sm text-gray-600">Time Left</div>
          <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
        </div>
        <h2 className="text-2xl font-bold text-center flex-1">
          🍛 Arrange the Perfect Sadhya! 🍛
        </h2>
        <button
          onClick={finishEarly}
          disabled={playerOrder.length !== dishes.length}
          className={`px-4 py-2 rounded-lg font-bold ${
            playerOrder.length === dishes.length
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit!
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Dishes */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-center">Available Dishes</h3>
          <div className="grid grid-cols-2 gap-3">
            {shuffledDishes.map(dish => (
              <div
                key={dish.id}
                draggable={gameActive}
                onDragStart={() => handleDragStart(dish)}
                className={`bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center cursor-move hover:bg-yellow-100 transition-colors ${
                  !gameActive ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-3xl mb-2">{dish.emoji}</div>
                <div className="font-medium text-gray-800">{dish.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Banana Leaf (Order Area) */}
        <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-center text-white">
            🌿 Banana Leaf (Drop dishes in order) 🌿
          </h3>
          <div className="space-y-2">
            {Array.from({ length: 8 }, (_, index) => {
              const dishAtPosition = playerOrder[index];
              return (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="min-h-16 bg-white/20 border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center relative"
                >
                  {dishAtPosition ? (
                    <div
                      onClick={() => handleRemoveFromOrder(dishAtPosition)}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors flex items-center space-x-3"
                    >
                      <span className="text-2xl">{dishAtPosition.emoji}</span>
                      <span className="font-medium">{dishAtPosition.name}</span>
                      <span className="text-xs text-gray-500">Click to remove</span>
                    </div>
                  ) : (
                    <div className="text-white/70 text-sm">
                      Position {index + 1} - Drop dish here
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto mt-6 bg-blue-50 rounded-xl p-4">
        <p className="text-center text-blue-800">
          <strong>Instructions:</strong> Drag dishes from the left to arrange them in the traditional Onam sadhya order on the banana leaf. 
          The correct order is: Rice → Parippu → Sambar → Rasam → Avial → Pachadi → Payasam → Pappadam
        </p>
      </div>

      {/* Game Over Screen */}
      {!gameActive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
            <p className="text-lg mb-4">
              You got {playerOrder.filter((dish, index) => dish.correctPosition === index + 1).length} out of {dishes.length} correct!
            </p>
            <p className="text-gray-600">Moving to next game...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SadhyaSorterGame;