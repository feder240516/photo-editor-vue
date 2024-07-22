import { useActionsStore } from '@/stores/actions';
import { useImagesStore, type ImageData } from '@/stores/images';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed, watch, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';

export function useDragger({
  image,
  initiaImagePositionInCanvas,
  initialMousePosition,
}: {
  image: Ref<ImageData | null>;
  initiaImagePositionInScreen: Ref<PositionCoords>;
  initiaImagePositionInCanvas: Ref<PositionCoords>;
  initialMousePosition: Ref<PositionCoords>;
}) {
  const imagesStore = useImagesStore();
  const { images } = storeToRefs(imagesStore);
  const selectionStore = useSelectionStore();
  const { setSelectedImage } = selectionStore;
  const actionsStore = useActionsStore();
  const { dragging, objectToAct, mousePosition } = storeToRefs(actionsStore);
  const { startDragging } = actionsStore;
  const draggingThis = computed(
    () => dragging.value && objectToAct.value === image.value!.id
  );
  const { moveImageTo } = imagesStore;

  const localPosition = computed(() => {
    return {
      x:
        mousePosition.value.x -
        initialMousePosition.value.x +
        initiaImagePositionInCanvas.value.x,
      y:
        mousePosition.value.y -
        initialMousePosition.value.y +
        initiaImagePositionInCanvas.value.y,
    };
  });

  watch(draggingThis, (newDraggingThis, oldDraggingThis) => {
    if (oldDraggingThis && !newDraggingThis) {
      moveImageTo(
        image.value!.id,
        localPosition.value.x,
        localPosition.value.y
      );
    }
  });

  function onStartDragging(event: PointerEvent) {
    const imageData = images.value[image.value!.id];
    if (!dragging.value && imageData) {
      startDragging({ x: event.pageX, y: event.pageY }, image.value!.id);
      setSelectedImage(image.value!.id);
      initiaImagePositionInCanvas.value = {
        x: imageData.x,
        y: imageData.y,
      };
      initialMousePosition.value = {
        x: event.pageX,
        y: event.pageY,
      };
    }
  }

  return { draggingThis, localPosition, onStartDragging };
}
