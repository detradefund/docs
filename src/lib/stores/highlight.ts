import { writable } from 'svelte/store';

type HighlightState = {
  term: string;
  sectionId: string;
  active: boolean;
};

export const highlightStore = writable<HighlightState>({
  term: '',
  sectionId: '',
  active: false
}); 