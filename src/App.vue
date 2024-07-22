<script setup lang="ts">
import { onMounted } from 'vue';
import { useActionsStore } from './stores/actions';
import { storeToRefs } from 'pinia';
const actionsStore = useActionsStore();
const { trackingMouseMovement } = storeToRefs(actionsStore);
const { stopTrackingMouse, updateMousePosition } = actionsStore;
onMounted(() => {
  document.addEventListener('pointermove', (event) => {
    if (trackingMouseMovement.value) {
      updateMousePosition({ x: event.pageX, y: event.pageY });
    }
  });
  document.addEventListener('pointerup', () => {
    stopTrackingMouse();
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
