import { usePhrases } from './hooks';
import { usePhraseStore } from './store';
import CardStack from './CardStack';
import './App.css'
import { useState, useEffect } from 'react';
import type { Phrase } from './types';
import { mockPhrases } from './mockData';

function App() {
  const { isLoading, error } = usePhrases();
  const phrases = usePhraseStore(state => state.phrases);
  const setPhrases = usePhraseStore(state => state.setPhrases);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to mock data if API is not available
  useEffect(() => {
    if (error && phrases.length === 0) {
      // Use mock data if there's an error and no phrases in store
      setPhrases(mockPhrases);
    }
  }, [error, phrases.length, setPhrases]);

  // Show loading state
  if (isLoading && phrases.length === 0) return <div>Loading...</div>;
  
  // Show error but still display mock data if available
  if (error && phrases.length === 0) return <div>Error loading phrases. Using mock data...</div>;
  
  // Show empty state
  if (phrases.length === 0) return <div>No phrases available</div>;

  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        position: 'relative'
      }}>
        <CardStack 
          phrases={phrases} 
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
        />
      </div>
    </>
  )
}

export default App