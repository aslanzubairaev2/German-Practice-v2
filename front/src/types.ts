export interface Phrase {
  id: string;
  russian: string;
  german: string;
  transcription: string | null;
  context: string | null;
  category: 'general' | 'w-fragen' | 'pronouns' | 'numbers' | 'time' | 'money' | 'calendar' | 'holidays';
  masterylevel: number;
  lastreviewedat: number | null;
  nextreviewat: number;
  knowcount: number;
  knowstreak: number;
  ismastered: boolean;
}