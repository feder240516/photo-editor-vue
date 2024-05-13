<script setup>
import { useImagesStore } from '@/stores/images';
import { ref } from 'vue';
const { imageIDs, images } = useImagesStore();
const height = ref(640);
const width = ref(640);
</script>
<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    class="bg-red-500 overflow-hidden relative"
  >
    <img
      v-for="imageID in imageIDs"
      :src="images[imageID].data"
      :key="imageID"
      class="absolute"
    />
  </div>
</template>
<style></style>
