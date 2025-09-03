import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPhrases, fetchPhraseById, createPhrase, updatePhrase, deletePhrase } from './api';
import { usePhraseStore } from './store';
import type { Phrase } from './types';
import { useEffect } from 'react';

// Query keys
const QUERY_KEYS = {
  phrases: ['phrases'] as const,
  phrase: (id: string) => ['phrase', id] as const,
};

// Queries
export const usePhrases = () => {
  const setPhrases = usePhraseStore(state => state.setPhrases);
  
  const query = useQuery({
    queryKey: QUERY_KEYS.phrases,
    queryFn: fetchPhrases,
  });

  useEffect(() => {
    if (query.data) {
      setPhrases(query.data);
    }
  }, [query.data, setPhrases]);

  return query;
};

export const usePhrase = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.phrase(id),
    queryFn: () => fetchPhraseById(id),
  });
};

// Mutations
export const useCreatePhrase = () => {
  const queryClient = useQueryClient();
  const addPhrase = usePhraseStore(state => state.addPhrase);
  
  return useMutation({
    mutationFn: createPhrase,
    onSuccess: (newPhrase) => {
      addPhrase(newPhrase);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.phrases });
    },
  });
};

export const useUpdatePhrase = () => {
  const queryClient = useQueryClient();
  const updatePhraseState = usePhraseStore(state => state.updatePhrase);
  
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Phrase> & { id: string }) => updatePhrase(id, data),
    onSuccess: (updatedPhrase) => {
      updatePhraseState(updatedPhrase.id, updatedPhrase);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.phrases });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.phrase(updatedPhrase.id) });
    },
  });
};

export const useDeletePhrase = () => {
  const queryClient = useQueryClient();
  const deletePhraseState = usePhraseStore(state => state.deletePhrase);
  
  return useMutation({
    mutationFn: deletePhrase,
    onSuccess: (_, id) => {
      deletePhraseState(id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.phrases });
    },
  });
};