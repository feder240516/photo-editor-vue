import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCanvasStore = defineStore('canvas', () => {
  const width = ref(640);
  const height = ref(640);
  return { width, height };
});
