<script setup lang="ts">
import { useActionsStore } from '@/stores/actions';
import { useImagesStore } from '@/stores/images';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const { imageID } = defineProps<{
  imageID: string;
}>();

const imagesStore = useImagesStore();
const { images } = storeToRefs(imagesStore);
const selectionStore = useSelectionStore();
const { selectedImage } = storeToRefs(selectionStore);
const { setSelectedImage } = selectionStore;
const actionsStore = useActionsStore();
const { dragging, objectToAct, mousePosition, resizing } =
  storeToRefs(actionsStore);
const { startDragging, startResizing } = actionsStore;
const draggingThis = computed(
  () => dragging.value && objectToAct.value === imageID
);
const resizingThis = computed(
  () => resizing.value && objectToAct.value === imageID
);
const isThisSelected = computed(
  () => selectedImage.value != null && selectedImage.value === imageID
);
const { moveImageTo, resizeImageTo } = imagesStore;
const initiaImagePositionInCanvas = ref({ x: 0, y: 0 });
const initiaImagePositionInScreen = ref({ x: 0, y: 0 });
const initialMousePosition = ref({ x: 0, y: 0 });
const imageRef = ref<HTMLDivElement | null>(null);
const debugMode = false;

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

const localDimensions = computed(() => {
  const calculatedWidth =
    mousePosition.value.x - initiaImagePositionInScreen.value.x;
  const calculatedHeight =
    mousePosition.value.y - initiaImagePositionInScreen.value.y;
  return {
    width: calculatedWidth > 1 ? calculatedWidth : 1,
    height: calculatedHeight > 1 ? calculatedHeight : 1,
  };
});

watch(draggingThis, (newDraggingThis, oldDraggingThis) => {
  if (oldDraggingThis && !newDraggingThis) {
    moveImageTo(imageID, localPosition.value.x, localPosition.value.y);
  }
});

watch(resizingThis, (newResizingThis, oldResizingThis) => {
  if (oldResizingThis && !newResizingThis) {
    resizeImageTo(
      imageID,
      localDimensions.value.width,
      localDimensions.value.height
    );
  }
});

function onStartDragging(event: MouseEvent) {
  const imageData = images.value[imageID];
  if (!dragging.value && imageData) {
    startDragging({ x: event.pageX, y: event.pageY }, imageID);
    setSelectedImage(imageID);
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

function onStartResizing(event: MouseEvent) {
  event.stopPropagation();
  if (!dragging.value && imageRef.value) {
    startResizing({ x: event.pageX, y: event.pageY }, imageID);
    setSelectedImage(imageID);
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
</script>
<template>
  <div
    v-if="images[imageID]"
    class="absolute max-w-none"
    :style="{
      width: `${resizingThis ? localDimensions.width : images[imageID]!.width}px`,
      height: `${resizingThis ? localDimensions.height : images[imageID]!.height}px`,
      left: `${draggingThis ? localPosition.x : images[imageID]!.x}px`,
      top: `${draggingThis ? localPosition.y : images[imageID]!.y}px`,
    }"
    :draggable="false"
    @dragstart.prevent
    @mousedown="onStartDragging"
    ref="imageRef"
  >
    <span v-if="debugMode" class="absolute top-0 left-0 z-50 text-black"
      >{{ mousePosition.x }} - {{ initiaImagePositionInScreen.x }} =
      {{ mousePosition.x - initiaImagePositionInScreen.x }}</span
    >
    <img
      :src="images[imageID]!.data"
      class="absolute max-w-none w-full h-full select-none"
      :draggable="false"
      @dragstart.prevent
    />
    <div
      v-if="images[imageID] && isThisSelected"
      class="absolute max-w-none w-full h-full border-teal-400 bg-transparent pointer-events-none border-2"
      data-export-ignore
    >
      <div
        data-name="top-left"
        class="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="top-center"
        class="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="top-right"
        class="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="center-left"
        class="absolute top-1/2 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="center-right"
        class="absolute top-1/2 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="bottom-left"
        class="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="bottom-center"
        class="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
      ></div>
      <div
        data-name="bottom-right"
        class="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
        @mousedown="onStartResizing"
      ></div>
    </div>
  </div>
</template>
