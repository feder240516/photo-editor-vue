<script setup lang="ts">
import { useDragStore } from '@/stores/drag';
import { useImagesStore } from '@/stores/images';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const { imageID } = defineProps<{
  imageID: string;
}>();

const imagesStore = useImagesStore();
const { images } = storeToRefs(imagesStore);
const dragStore = useDragStore();
const { dragging, objectDragged, mousePosition } = storeToRefs(dragStore);
const { startDragging } = dragStore;
const draggingThis = computed(
  () => dragging.value && objectDragged.value === imageID
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
// const localY = ref(0);

const imgRef = ref<HTMLImageElement | null>(null);

function onStartDragging(event: MouseEvent) {
  const imageData = images.value[imageID];
  if (!dragging.value && imageData) {
    startDragging({ x: event.screenX, y: event.screenY }, imageID);
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
// function onEndDragging() {
//   dragging.value = false;
//   console.log(imageID, localX.value, localY.value);
//   moveImageTo(imageID, localX.value, localY.value);
// }
</script>
<template>
  <img
    v-if="images[imageID]"
    ref="imgRef"
    :src="images[imageID]!.data"
    class="absolute max-w-none"
    :style="{
      width: `${images[imageID]!.width}px`,
      height: `${images[imageID]!.height}px`,
      left: `${draggingThis ? localPosition.x : images[imageID]!.x}px`,
      top: `${draggingThis ? localPosition.y : images[imageID]!.y}px`,
    }"
    @mousedown="onStartDragging"
    :draggable="false"
  />
</template>
