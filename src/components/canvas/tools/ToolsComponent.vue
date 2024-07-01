<script setup lang="ts">
import { ref } from 'vue';
import { useCanvasStore } from '@/stores/canvas';
import loadImageData from '@/utils/loadImageData';
import { useLayers } from '@/composables/useLayers';

const { exportImage } = useCanvasStore();
const { addLayerForImage } = useLayers();

const fileInput = ref<HTMLInputElement | null>(null);

const onClickAddFileButton = () => {
  fileInput.value?.click();
};

const onExportImage = () => {
  exportImage();
};

const onLoadImage = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const imageData = await loadImageData(file);
  addLayerForImage(imageData, {});
  (event.target as HTMLInputElement).value = '';
};
</script>
<template>
  <div>
    <button @click="onClickAddFileButton">Add image</button>
    <span> | </span>
    <button @click="onExportImage">Export image</button>
    <input type="file" ref="fileInput" class="hidden" @input="onLoadImage" />
  </div>
</template>
