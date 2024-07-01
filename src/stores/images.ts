import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export type AddImageArgs = {
  filename: string;
  data: string;
  height: number;
  width: number;
};

export type ImageData = {
  id: string;
  data: string;
  filename: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useImagesStore = defineStore('images', () => {
  const images = ref<Record<string, ImageData>>({});

  const imageIDs = ref<string[]>([]);

  function getImageByID(imageID: string) {
    return images.value[imageID];
  }

  function addImage(image: AddImageArgs): ImageData {
    const id = uuid();
    const newImage = (images.value[id] = {
      id,
      data: image.data,
      filename: image.filename,
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
    imageIDs.value.push(id);
    return newImage;
  }

  function moveImageTo(imageID: string, x: number, y: number): void {
    const image = images.value[imageID];
    if (image) {
      image.x = x;
      image.y = y;
    }
  }

  function resizeImageTo(imageID: string, width: number, height: number): void {
    const image = images.value[imageID];
    if (image) {
      image.width = width;
      image.height = height;
    }
  }

  return {
    images,
    imageIDs,
    getImageByID,
    addImage,
    moveImageTo,
    resizeImageTo,
  };
});
