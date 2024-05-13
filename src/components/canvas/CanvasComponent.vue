<script setup>
import { useCanvasStore } from '@/stores/canvas';
import { useImagesStore } from '@/stores/images';
import { storeToRefs } from 'pinia';
import ImageComponent from './ImageComponent.vue';
const canvasStore = useCanvasStore();
const { height, width } = storeToRefs(canvasStore);
const imagesStore = useImagesStore();
const { imageIDs } = storeToRefs(imagesStore);
</script>
<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    class="bg-red-500 overflow-hidden relative"
  >
    <ImageComponent v-for="imageID in imageIDs" :key="imageID" :imageID />
  </div>
</template>
<style></style>
