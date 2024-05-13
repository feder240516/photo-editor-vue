<script setup>
import { ref } from 'vue';
const height = ref(640);
const width = ref(640);
</script>
<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: 'red',
    }"
  ></div>
</template>
<style></style>
