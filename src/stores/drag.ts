import { defineStore } from 'pinia';
import { ref } from 'vue';

type MousePosition = {
  x: number;
  y: number;
};

export const useDragStore = defineStore('drag', () => {
  const dragging = ref(false);
  const objectDragged = ref<string | null>(null);
  const mousePosition = ref({
    x: 0,
    y: 0,
  });
  const onStopDragging = ref<null | (() => any)>();

  function startDragging(position: MousePosition, objectID: string) {
    dragging.value = true;
    objectDragged.value = objectID;
    mousePosition.value = { ...position };
  }

  function stopDragging() {
    dragging.value = false;
    objectDragged.value = null;
    onStopDragging.value?.();
    onStopDragging.value = null;
  }

  function updateMousePosition(position: MousePosition) {
    if (dragging.value) {
      mousePosition.value = { ...position };
    }
  }

  return {
    dragging,
    objectDragged,
    mousePosition,
    updateMousePosition,
    startDragging,
    stopDragging,
  };
});
