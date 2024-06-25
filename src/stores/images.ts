import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useImagesStore = defineStore('images', () => {
  const images = ref<
    Record<
      string,
      {
        id: string;
        data: string;
        filename: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }
    >
  >({});

  const imageIDs = ref<string[]>([]);

  function addImage(image: {
    filename: string;
    data: string;
    height: number;
    width: number;
  }) {
    const id = uuid();
    images.value[id] = {
      id,
      data: image.data,
      filename: image.filename,
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    };
    imageIDs.value.push(id);
  }

  function moveImageTo(imageID: string, x: number, y: number) {
    const image = images.value[imageID];
    if (image) {
      image.x = x;
      image.y = y;
    }
  }

  function resizeImageTo(imageID: string, width: number, height: number) {
    const image = images.value[imageID];
    if (image) {
      image.width = width;
      image.height = height;
    }
  }

  return {
    images,
    imageIDs,
    addImage,
    moveImageTo,
    resizeImageTo,
  };
});
