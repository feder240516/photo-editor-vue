<script setup lang="ts">
import { useImagesStore } from '@/stores/images';
import { storeToRefs } from 'pinia';

defineProps<{
  imageID: string;
}>();
const imagesStore = useImagesStore();
const { images } = storeToRefs(imagesStore);
</script>
<template>
  <img
    v-if="images[imageID]"
    :src="images[imageID]!.data"
    class="absolute max-w-none"
    :style="{
      width: `${images[imageID]!.width}px`,
      height: `${images[imageID]!.height}px`,
      left: `${images[imageID]!.x}px`,
      top: `${images[imageID]!.y}px`,
    }"
  />
</template>
