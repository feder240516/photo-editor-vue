<script setup lang="ts">
import { onMounted } from 'vue';
import { useActionsStore } from './stores/actions';
import { storeToRefs } from 'pinia';
const actionsStore = useActionsStore();
const { trackingMouseMovement } = storeToRefs(actionsStore);
const { stopTrackingMouse, updateMousePosition } = actionsStore;
onMounted(() => {
  document.addEventListener('mousemove', (event) => {
    if (trackingMouseMovement.value) {
      updateMousePosition({ x: event.pageX, y: event.pageY });
    }
  });
  document.addEventListener('mouseup', () => {
    stopTrackingMouse();
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
