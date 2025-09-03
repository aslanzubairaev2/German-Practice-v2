import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './Card.css';
import type { Phrase } from './types';

interface CardProps {
  phrase: Phrase;
  onSwipe?: (direction: 'left' | 'right') => void;
}

export interface CardHandle {
  flipAndSpeak: () => void;
}

const Card = forwardRef<CardHandle, CardProps>(({ phrase, onSwipe }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Text-to-speech function for German phrase
  const speakGermanPhrase = () => {
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

  // Expose method to parent component
  useImperativeHandle(ref, () => ({
    flipAndSpeak: () => {
      // Flip the card to show the German phrase
      setIsFlipped(true);
      
      // Play the German phrase audio
      speakGermanPhrase();
    }
  }));

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onSwipe) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!onSwipe || !isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    
    // Only consider significant horizontal movements
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      setTranslateX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!onSwipe || !isDragging) return;
    
    setIsDragging(false);
    
    // Minimum swipe distance to trigger action
    if (Math.abs(translateX) > 50) {
      const direction = translateX > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
    
    // Reset position
    setTranslateX(0);
  };

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onSwipe) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!onSwipe || !isDragging) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    
    // Only consider significant horizontal movements
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      setTranslateX(diffX);
    }
  };

  const handleMouseUp = () => {
    if (!onSwipe || !isDragging) return;
    
    setIsDragging(false);
    
    // Minimum swipe distance to trigger action
    if (Math.abs(translateX) > 50) {
      const direction = translateX > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
    
    // Reset position
    setTranslateX(0);
  };

  // Reset flip state when phrase changes
  useEffect(() => {
    setIsFlipped(false);
  }, [phrase.id]);

  return (
    <div className="card-container"
      onClick={handleFlip}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
        cursor: onSwipe ? 'grab' : 'default',
        ...(isDragging && onSwipe && { cursor: 'grabbing' })
      }}
    >
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <div className="card-text">{phrase.russian}</div>
          {phrase.context && (
            <div className="card-context">
              <small>{phrase.context}</small>
            </div>
          )}
        </div>
        <div className="card-back">
          <div className="card-text">{phrase.german}</div>
          {phrase.transcription && (
            <div className="card-transcription">
              <small>{phrase.transcription}</small>
            </div>
          )}
          {phrase.context && (
            <div className="card-context">
              <small>{phrase.context}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Card;