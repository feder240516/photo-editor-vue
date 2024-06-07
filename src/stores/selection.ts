import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSelectionStore = defineStore('selection', () => {
  const selectedImage = ref<string>();
  function setSelectedImage(imageID: string) {
    selectedImage.value = imageID;
  }
  function clearSelection() {
    selectedImage.value = undefined;
  }

  return {
    selectedImage,
    setSelectedImage,
    clearSelection,
  };
});
