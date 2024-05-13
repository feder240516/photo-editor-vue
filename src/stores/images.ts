import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useImagesStore = defineStore('images', () => {
  const images = ref<Record<string, { id: string; data: string; file: File }>>(
    {}
  );
  const imageIDs = ref<string[]>([]);
  function addImage(file: File, data: string) {
    const id = uuid();
    images.value[id] = {
      id,
      data,
      file,
    };
    imageIDs.value.push(id);
  }

  return { images, imageIDs, addImage };
});
