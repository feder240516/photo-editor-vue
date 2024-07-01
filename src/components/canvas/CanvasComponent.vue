<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvas';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import ImageComponent from './ImageComponent.vue';
import { useLayers } from '@/composables/useLayers';

const canvasStore = useCanvasStore();
const { height, width, canvasRef } = storeToRefs(canvasStore);
const { layerIDs } = useLayers();
const selectionStore = useSelectionStore();
const { clearSelection } = selectionStore;
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
    class="overflow-hidden relative"
    ref="canvasRef"
    @mousedown="onClickCanvas"
  >
    <div
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage:
          'repeating-conic-gradient(#b9b9b9 0% 25%, #535353 0% 50%)',
        backgroundPosition: '0 0, 16px 16px',
        backgroundSize: '32px 32px',
        backgroundColor: '#535353',
      }"
      data-export-ignore
    ></div>
    <ImageComponent v-for="layerID in layerIDs" :key="layerID" :layerID />
  </div>
</template>
<style></style>
