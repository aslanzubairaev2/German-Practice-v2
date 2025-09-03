import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import './CardStack.css';
import type { Phrase } from './types';

interface CardStackProps {
  phrases: Phrase[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
}

const CardStack: React.FC<CardStackProps> = ({ phrases, currentIndex, onIndexChange }) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key to force re-render
  const currentCardRef = useRef<{ flipAndSpeak: () => void } | null>(null);
  
  // Text-to-speech function for German phrase
  const speakGermanPhrase = (phrase: Phrase) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create and configure utterance
      const utterance = new SpeechSynthesisUtterance(phrase.german);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8; // Slightly slower for better comprehension
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Speak the phrase
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser');
    }
  };

  const handleDontKnow = () => {
    // Get current phrase
    const currentPhrase = phrases[currentIndex];
    
    // Flip the card and speak the German phrase
    if (currentCardRef.current) {
      currentCardRef.current.flipAndSpeak();
    } else {
      // Fallback if ref is not available
      speakGermanPhrase(currentPhrase);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // Calculate new index
    const newIndex = direction === 'left' 
      ? (currentIndex + 1) % phrases.length 
      : (currentIndex - 1 + phrases.length) % phrases.length;
    
    // Trigger the index change after animation completes
    setTimeout(() => {
      onIndexChange(newIndex);
      setSwipeDirection(null);
      setIsAnimating(false);
      setAnimationKey(prev => prev + 1); // Force re-render to prevent flickering
    }, 300);
  };

  // Get current and next/prev cards
  const currentPhrase = phrases[currentIndex];
  const nextPhrase = phrases[(currentIndex + 1) % phrases.length];
  const prevPhrase = phrases[(currentIndex - 1 + phrases.length) % phrases.length];

  return (
    <div className="card-stack">
      {/* Previous card (for right swipe) */}
      {swipeDirection === 'right' && (
        <div className="card-coming-from-left" key={`prev-${animationKey}`}>
          <Card phrase={prevPhrase} />
        </div>
      )}
      
      {/* Next card (for left swipe) */}
      {swipeDirection === 'left' && (
        <div className="card-coming-from-right" key={`next-${animationKey}`}>
          <Card phrase={nextPhrase} />
        </div>
      )}
      
      {/* Current card */}
      <div className={`card-current ${swipeDirection ? `swipe-${swipeDirection}` : ''}`} key={`current-${animationKey}`}>
        <Card 
          ref={currentCardRef}
          phrase={currentPhrase} 
          onSwipe={handleSwipe} 
        />
      </div>
      
      {/* "Don't know" button - separate from the card */}
      <div className="dont-know-container">
        <span className="dont-know-text" onClick={handleDontKnow}>
          Не знаю
        </span>
      </div>
    </div>
  );
};

export default CardStack;