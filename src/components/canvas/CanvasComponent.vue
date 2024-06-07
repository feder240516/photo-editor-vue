<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvas';
import { useImagesStore } from '@/stores/images';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import ImageComponent from './ImageComponent.vue';
import { ref } from 'vue';
const canvasStore = useCanvasStore();
const { height, width } = storeToRefs(canvasStore);
const imagesStore = useImagesStore();
const { imageIDs } = storeToRefs(imagesStore);
const selectionStore = useSelectionStore();
const { clearSelection } = selectionStore;
const canvasRef = ref<HTMLDivElement | null>(null);
function onClickCanvas(event: MouseEvent) {
  if (event.target === canvasRef.value) {
    clearSelection();
  }
}
</script>
<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    class="bg-red-500 overflow-hidden relative"
    ref="canvasRef"
    @click="onClickCanvas"
  >
    <ImageComponent v-for="imageID in imageIDs" :key="imageID" :imageID />
  </div>
</template>
<style></style>
