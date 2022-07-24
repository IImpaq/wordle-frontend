import {writable, readable} from 'svelte/store';

export const letter_count = readable(5);
export const word_count = readable(6);
export const key_letters = readable([
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]);

export const words = writable([]);
export const chosen_word = writable("");

export const current_word = writable([]);
export const current_letter = writable(0);
export const current_row = writable(0);
export const correct_letters = writable(0);
