import React, { useState, useEffect, useRef } from 'react';
import { Trophy } from 'lucide-react';

interface BananaChipGameProps {
  onComplete: (score: number) => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'chip' | 'obstacle';
  emoji: string;
}

const BananaChipGame: React.FC<BananaChipGameProps> = ({ onComplete }) => {
  const [platePosition, setPlatePosition] = useState(50); // percentage
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemIdRef = useRef(0);

  const chips = ['🍌', '🥥', '🫘'];
  const obstacles = ['👡', '🐟', '🏏'];

  // Handle plate movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setPlatePosition(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setPlatePosition(prev => Math.min(90, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  // Handle mouse/touch movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameActive || !gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlatePosition(Math.max(0, Math.min(90, x - 5)));
  };

  // Spawn falling items
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      const isChip = Math.random() > 0.3;
      const newItem: FallingItem = {
        id: itemIdRef.current++,
        x: Math.random() * 90,
        y: -10,
        type: isChip ? 'chip' : 'obstacle',
        emoji: isChip ? chips[Math.floor(Math.random() * chips.length)] : obstacles[Math.floor(Math.random() * obstacles.length)]
      };
      
      setFallingItems(prev => [...prev, newItem]);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  // Move falling items and check collisions
  useEffect(() => {
    if (!gameActive) return;

    const moveInterval = setInterval(() => {
      setFallingItems(prev => {
        const newItems = prev.map(item => ({ ...item, y: item.y + 3 }));
        
        // Check collisions with plate
        newItems.forEach(item => {
          if (item.y > 80 && item.y < 90 && 
              item.x > platePosition - 5 && item.x < platePosition + 15) {
            if (item.type === 'chip') {
              setScore(s => s + 10);
            } else {
              setScore(s => Math.max(0, s - 5));
            }
          }
        });
        
        // Remove items that are off screen
        return newItems.filter(item => item.y < 100);
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameActive, platePosition]);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score, onComplete]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://media-cdn.tripadvisor.com/media/photo-s/1c/38/8d93/kerala-is-not-only-the.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-white/90 rounded-lg px-4 py-2">
          <div className="text-sm text-gray-600">Score</div>
          <div className="text-2xl font-bold text-green-600">{score}</div>
        </div>
        <div className="bg-white/90 rounded-lg px-4 py-2">
          <div className="text-sm text-gray-600">Time</div>
          <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 rounded-lg px-4 py-2 text-center">
          <div className="text-sm text-gray-700">Use ← → keys or mouse to move the plate!</div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="absolute inset-0 cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Falling Items */}
        {fallingItems.map(item => (
          <div
            key={item.id}
            className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Plate */}
        <div
          className="absolute bottom-16 w-20 h-6 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full border-2 border-yellow-900 shadow-lg transform -translate-x-1/2 transition-all duration-100"
          style={{ left: `${platePosition + 5}%` }}
        >
          <div className="text-center text-xs text-white font-bold leading-6">🍽️</div>
        </div>
      </div>

      {/* Game Over Screen */}
      {!gameActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
            <p className="text-lg mb-4">Final Score: <span className="font-bold text-green-600">{score}</span></p>
            <p className="text-gray-600">Great reflexes! Moving to next game...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BananaChipGame;