import { useActionsStore } from '@/stores/actions';
import { useImagesStore, type ImageData } from '@/stores/images';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed, watch, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';
import { useLocalDimensions } from './useLocalDimensions';

export function useResizer({
  imageRef,
  image,
  initiaImagePositionInScreen,
  initialMousePosition,
}: {
  imageRef: Ref<HTMLDivElement | null>;
  image: Ref<ImageData | null>;
  initiaImagePositionInScreen: Ref<PositionCoords>;
  initialMousePosition: Ref<PositionCoords>;
}) {
  const actionsStore = useActionsStore();
  const { startResizing } = actionsStore;
  const { dragging, objectToAct, mousePosition, resizing } =
    storeToRefs(actionsStore);

  const selectionStore = useSelectionStore();
  const { setSelectedImage } = selectionStore;

  const imagesStore = useImagesStore();
  const { resizeImageTo } = imagesStore;

  const resizingThis = computed(
    () => resizing.value && objectToAct.value === image.value!.id
  );

  const localDimensions = useLocalDimensions(
    mousePosition,
    initiaImagePositionInScreen
  );

  watch(resizingThis, (newResizingThis, oldResizingThis) => {
    if (oldResizingThis && !newResizingThis) {
      resizeImageTo(
        image.value!.id,
        localDimensions.value.width,
        localDimensions.value.height
      );
    }
  });

  function onStartResizing(event: MouseEvent) {
    event.stopPropagation();
    if (!dragging.value && imageRef.value) {
      startResizing({ x: event.pageX, y: event.pageY }, image.value!.id);
      setSelectedImage(image.value!.id);
      initiaImagePositionInScreen.value = {
        x: imageRef.value.getBoundingClientRect().x,
        y: imageRef.value.getBoundingClientRect().y,
      };
      initialMousePosition.value = {
        x: event.pageX,
        y: event.pageY,
      };
    }
  }

  return { localDimensions, resizingThis, onStartResizing };
}
