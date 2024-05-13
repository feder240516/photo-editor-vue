<script setup lang="ts">
import { ref } from 'vue';
import { useImagesStore } from '@/stores/images';

const imagesStore = useImagesStore();

const fileInput = ref<HTMLInputElement | null>(null);
const onClickAddFileButton = () => {
  fileInput.value?.click();
};

const onLoadImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  console.log(file);
  const fileReader = new FileReader();
  fileReader.onload = () => {
    imagesStore.addImage(file, fileReader.result as string);
  };
  fileReader.readAsDataURL(file);
};
</script>
<template>
  <div>
    <button @click="onClickAddFileButton">Add image</button>
    <input type="file" ref="fileInput" class="hidden" @input="onLoadImage" />
  </div>
</template>
