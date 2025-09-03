import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { Phrase } from './types';
import './Card.css';

interface CardProps {
  phrase: Phrase;
  isFlipped: boolean;
  onFlip: () => void;
}

export interface CardHandle {
  flipAndSpeak: () => void;
}

const Card = forwardRef<CardHandle, CardProps>(({ phrase, isFlipped, onFlip }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      setIsAnimating(true);
    }
  }, [isFlipped]);

  const handleAnimationEnd = () => {
    if (!isFlipped) {
      setIsAnimating(false);
    }
  };

  const handlePronounce = () => {
    if (phrase.transcription) {
      // In a real app, you would use a text-to-speech API here
      console.log(`Pronouncing: ${phrase.german} [${phrase.transcription}]`);
    }
  };

  // Expose method to parent component
  useImperativeHandle(ref, () => ({
    flipAndSpeak: () => {
      if (!isFlipped) {
        onFlip();
      }
      handlePronounce();
    }
  }));

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`} 
      onClick={onFlip}
      onAnimationEnd={handleAnimationEnd}
      style={{
        position: 'relative',
        width: '300px',
        height: '200px',
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{phrase.german}</h3>
          {phrase.transcription && <p className="transcription">[{phrase.transcription}]</p>}
          {phrase.context && <p className="context">{phrase.context}</p>}
        </div>
        <div className="card-back">
          <h3>{phrase.russian}</h3>
          {phrase.category && <p className="category">{phrase.category}</p>}
        </div>
      </div>
    </div>
  );
});

export default Card;