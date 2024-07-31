<script setup lang="ts">
import { useLayerByID } from '@/composables/useLayerByID';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { layerID } = defineProps<{
  layerID: string;
}>();

const { selectedImage } = storeToRefs(useSelectionStore());
const { layer, image, moveThisLayerUp, moveThisLayerDown } =
  useLayerByID(layerID);
const isSelected = computed(() => selectedImage.value === image.value?.id);
const greenBorderClass = computed(() =>
  isSelected.value ? 'border-teal-400' : 'border-transparent'
);
const divClass = computed(
  () => `flex gap-2 border-2 ${greenBorderClass.value}`
);
</script>
<template>
  <div :class="divClass">
    <span class="w-[200px]">{{ layer?.name }}</span>
    <button class="w-fit" @click="moveThisLayerUp">Move up</button>
    <button class="w-fit" @click="moveThisLayerDown">Move down</button>
  </div>
</template>

<style scoped></style>
