<script setup lang="ts">
import { useDragStore } from '@/stores/drag';
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
const dragStore = useDragStore();
const { dragging, objectDragged, mousePosition } = storeToRefs(dragStore);
const { startDragging } = dragStore;
const draggingThis = computed(
  () => dragging.value && objectDragged.value === imageID
);
const isThisSelected = computed(
  () => selectedImage.value != null && selectedImage.value === imageID
);
const { moveImageTo } = imagesStore;
const initialPosition = ref({ x: 0, y: 0 });
const initialMousePosition = ref({ x: 0, y: 0 });
const localPosition = computed(() => {
  return {
    x:
      mousePosition.value.x -
      initialMousePosition.value.x +
      initialPosition.value.x,
    y:
      mousePosition.value.y -
      initialMousePosition.value.y +
      initialPosition.value.y,
  };
});

watch(draggingThis, (newDraggingThis, oldDraggingThis) => {
  if (oldDraggingThis && !newDraggingThis) {
    console.log('stopped dragging');
    moveImageTo(imageID, localPosition.value.x, localPosition.value.y);
  }
});

function onStartDragging(event: MouseEvent) {
  const imageData = images.value[imageID];
  if (!dragging.value && imageData) {
    startDragging({ x: event.screenX, y: event.screenY }, imageID);
    setSelectedImage(imageID);
    initialPosition.value = {
      x: imageData.x,
      y: imageData.y,
    };
    initialMousePosition.value = {
      x: event.screenX,
      y: event.screenY,
    };
  }
}
</script>
<template>
  <div
    v-if="images[imageID]"
    class="absolute max-w-none"
    :style="{
      width: `${images[imageID]!.width}px`,
      height: `${images[imageID]!.height}px`,
      left: `${draggingThis ? localPosition.x : images[imageID]!.x}px`,
      top: `${draggingThis ? localPosition.y : images[imageID]!.y}px`,
    }"
    :draggable="false"
    @mousedown="onStartDragging"
  >
    <img
      :src="images[imageID]!.data"
      class="absolute max-w-none w-full h-full"
      :draggable="false"
    />
    <div
      v-if="images[imageID] && isThisSelected"
      class="absolute max-w-none w-full h-full border-teal-400 bg-transparent pointer-events-none border-2"
    >
      <div
        class="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute top-1/2 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute top-1/2 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-400"
      ></div>
      <div
        class="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 bg-teal-400"
      ></div>
    </div>
  </div>
</template>
