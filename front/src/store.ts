import type { Phrase } from './types';
import { create } from 'zustand';

interface PhraseStore {
  phrases: Phrase[];
  setPhrases: (phrases: Phrase[]) => void;
  addPhrase: (phrase: Phrase) => void;
  updatePhrase: (id: string, updatedPhrase: Partial<Phrase>) => void;
  deletePhrase: (id: string) => void;
}

export const usePhraseStore = create<PhraseStore>((set) => ({
  phrases: [],
  setPhrases: (phrases) => set({ phrases }),
  addPhrase: (phrase) => set((state) => ({ phrases: [...state.phrases, phrase] })),
  updatePhrase: (id, updatedPhrase) => set((state) => ({
    phrases: state.phrases.map(phrase => 
      phrase.id === id ? { ...phrase, ...updatedPhrase } : phrase
    )
  })),
  deletePhrase: (id) => set((state) => ({
    phrases: state.phrases.filter(phrase => phrase.id !== id)
  }))
}));