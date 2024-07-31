<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCanvasStore } from '@/stores/canvas';
import loadImageData from '@/utils/loadImageData';
import { useLayers } from '@/composables/useLayers';
import { useToolsStore } from '@/stores/tools';
import { storeToRefs } from 'pinia';

defineProps<{
  showLayersTool?: boolean;
}>();

const { exportImage } = useCanvasStore();
const { toggleLayersMenu } = useToolsStore();
const { showLayersMenu } = storeToRefs(useToolsStore());
const { addLayerForImage } = useLayers();

const fileInput = ref<HTMLInputElement | null>(null);

const onClickAddFileButton = () => {
  fileInput.value?.click();
};

const onExportImage = () => {
  exportImage();
};

const onToggleLayers = () => {
  toggleLayersMenu();
};

const onLoadImage = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const imageData = await loadImageData(file);
  addLayerForImage(imageData, {});
  (event.target as HTMLInputElement).value = '';
};

const toggleLayersText = computed(() =>
  showLayersMenu.value ? 'Hide layers' : 'Show layers'
);
</script>
<template>
  <div>
    <button @click="onClickAddFileButton">Add image</button>
    <span> | </span>
    <button @click="onExportImage">Export image</button>
    <input type="file" ref="fileInput" class="hidden" @input="onLoadImage" />
    <template v-if="showLayersTool">
      <span> | </span>
      <button @click="onToggleLayers">{{ toggleLayersText }}</button>
    </template>
  </div>
</template>
