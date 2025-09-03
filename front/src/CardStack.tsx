import React, { useState } from 'react';
import Card from './Card';
import type { CardHandle } from './Card';
import type { Phrase } from './types';
import './CardStack.css';

interface CardStackProps {
  phrases: Phrase[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const CardStack: React.FC<CardStackProps> = ({ phrases, currentIndex, onIndexChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = React.useRef<CardHandle>(null);

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setIsFlipped(false);
      onIndexChange(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      onIndexChange(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (cardRef.current) {
        cardRef.current.flipAndSpeak();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleSpacebar);
    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, []);

  if (phrases.length === 0) return <div>No phrases available</div>;

  const currentPhrase = phrases[currentIndex];

  return (
    <div className="card-stack">
      <button 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
        className="nav-button prev-button"
      >
        ←
      </button>
      
      <Card 
        ref={cardRef}
        phrase={currentPhrase} 
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />
      
      <button 
        onClick={handleNext} 
        disabled={currentIndex === phrases.length - 1}
        className="nav-button next-button"
      >
        →
      </button>
      
      <div className="progress-indicator">
        {currentIndex + 1} / {phrases.length}
      </div>
    </div>
  );
};

export default CardStack;