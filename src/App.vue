<script setup lang="ts">
import { onMounted } from 'vue';
import { useDragStore } from './stores/drag';
import { storeToRefs } from 'pinia';
const dragStore = useDragStore();
const { dragging } = storeToRefs(dragStore);
const { stopDragging, updateMousePosition } = dragStore;
onMounted(() => {
  document.addEventListener('mousemove', (event) => {
    if (dragging) {
      updateMousePosition({ x: event.screenX, y: event.screenY });
    }
  });
  document.addEventListener('mouseup', () => {
    stopDragging();
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
