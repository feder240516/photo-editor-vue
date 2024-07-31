<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvas';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import ImageComponent from './ImageComponent.vue';
import { useLayers } from '@/composables/useLayers';
import { useMobileMediaQuery } from '@/composables/useMediaQuery';
import { computed, type StyleValue } from 'vue';

const canvasStore = useCanvasStore();
const { height, width, canvasRef } = storeToRefs(canvasStore);
const matchesMobileMediaQuery = useMobileMediaQuery();
const canvasDimensions = computed<StyleValue>(() => {
  if (matchesMobileMediaQuery.value) {
    return {
      width: '100vw',
      aspectRatio: 1,
    };
  } else {
    return {
      width: `${width.value}px`,
      height: `${height.value}px`,
    };
  }
});
const { layerIDs } = useLayers();
const selectionStore = useSelectionStore();
const { clearSelection } = selectionStore;
function onClickCanvas() {
  clearSelection();
}
</script>
<template>
  <div
    :style="canvasDimensions"
    class="overflow-hidden relative canvas-component"
    ref="canvasRef"
  >
    <div
      :style="{
        width: `100%`,
        height: `100%`,
        backgroundImage:
          'repeating-conic-gradient(#b9b9b9 0% 25%, #535353 0% 50%)',
        backgroundPosition: '0 0, 16px 16px',
        backgroundSize: '32px 32px',
        backgroundColor: '#535353',
      }"
      @mousedown="onClickCanvas"
      :draggable="false"
      @dragstart.prevent
      data-export-ignore
    ></div>
    <ImageComponent v-for="layerID in layerIDs" :key="layerID" :layerID />
  </div>
</template>
