import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToolsStore = defineStore('tools', () => {
  const showLayersMenu = ref(true);
  function toggleLayersMenu() {
    showLayersMenu.value = !showLayersMenu.value;
  }

  return {
    showLayersMenu,
    toggleLayersMenu,
  };
});
