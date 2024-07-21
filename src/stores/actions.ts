import type {
  XResizerHandleEnum,
  YResizerHandleEnum,
} from '@/composables/useResizer';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type MousePosition = {
  x: number;
  y: number;
};

type MouseAction = 'drag' | 'resize' | 'nothing';

export const useActionsStore = defineStore('actions', () => {
  const actionToDo = ref<MouseAction>('nothing');
  const dragging = computed(() => actionToDo.value === 'drag');
  const resizing = computed(() => actionToDo.value === 'resize');
  const resizingParams = ref<{
    xHandle: XResizerHandleEnum;
    yHandle: YResizerHandleEnum;
  }>({ xHandle: 'right', yHandle: 'bottom' });
  const trackingMouseMovement = computed(
    () => actionToDo.value === 'drag' || actionToDo.value === 'resize'
  );
  const objectToAct = ref<string | null>(null);
  const mousePosition = ref({
    x: 0,
    y: 0,
  });

  function startDragging(position: MousePosition, objectID: string) {
    actionToDo.value = 'drag';
    objectToAct.value = objectID;
    mousePosition.value = { ...position };
  }

  function startResizing(
    position: MousePosition,
    objectID: string,
    {
      xHandle,
      yHandle,
    }: { xHandle: XResizerHandleEnum; yHandle: YResizerHandleEnum }
  ) {
    actionToDo.value = 'resize';
    objectToAct.value = objectID;
    mousePosition.value = { ...position };
    resizingParams.value = { xHandle, yHandle };
  }

  function stopTrackingMouse() {
    actionToDo.value = 'nothing';
    objectToAct.value = null;
  }

  function updateMousePosition(position: MousePosition) {
    if (trackingMouseMovement.value) {
      mousePosition.value = { ...position };
    }
  }

  return {
    dragging,
    resizing,
    resizingParams,
    trackingMouseMovement,
    objectToAct,
    mousePosition,
    updateMousePosition,
    startDragging,
    stopTrackingMouse,
    startResizing,
  };
});
