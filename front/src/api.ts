import type { Phrase } from './types';

const API_BASE_URL = '/api'; // This will be proxied to your backend

export const fetchPhrases = async (): Promise<Phrase[]> => {
  const response = await fetch(`${API_BASE_URL}/phrases`);
  if (!response.ok) {
    throw new Error('Failed to fetch phrases');
  }
  return response.json();
};

export const fetchPhraseById = async (id: string): Promise<Phrase> => {
  const response = await fetch(`${API_BASE_URL}/phrases/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch phrase');
  }
  return response.json();
};

export const createPhrase = async (phrase: Omit<Phrase, 'id'>): Promise<Phrase> => {
  const response = await fetch(`${API_BASE_URL}/phrases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(phrase),
  });
  if (!response.ok) {
    throw new Error('Failed to create phrase');
  }
  return response.json();
};

export const updatePhrase = async (id: string, phrase: Partial<Phrase>): Promise<Phrase> => {
  const response = await fetch(`${API_BASE_URL}/phrases/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(phrase),
  });
  if (!response.ok) {
    throw new Error('Failed to update phrase');
  }
  return response.json();
};

export const deletePhrase = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/phrases/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete phrase');
  }
};