import type { Phrase } from './types';

export const mockPhrases: Phrase[] = [
  {
    id: '1',
    russian: 'Привет',
    german: 'Hallo',
    transcription: '[халло]',
    context: 'Неформальное приветствие между друзьями',
    category: 'general',
    masterylevel: 0,
    lastreviewedat: null,
    nextreviewat: 1682947200000,
    knowcount: 0,
    knowstreak: 0,
    ismastered: false
  },
  {
    id: '2',
    russian: 'Спасибо',
    german: 'Danke',
    transcription: '[данке]',
    context: 'Выражение благодарности в повседневной ситуации',
    category: 'general',
    masterylevel: 1,
    lastreviewedat: 1682947200000,
    nextreviewat: 1683033600000,
    knowcount: 1,
    knowstreak: 1,
    ismastered: false
  },
  {
    id: '3',
    russian: 'Пожалуйста',
    german: 'Bitte',
    transcription: '[битте]',
    context: 'Ответ на благодарность или вежливый запрос',
    category: 'general',
    masterylevel: 2,
    lastreviewedat: 1683033600000,
    nextreviewat: 1683120000000,
    knowcount: 2,
    knowstreak: 2,
    ismastered: true
  }
];