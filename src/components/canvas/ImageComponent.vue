<script setup lang="ts">
import { useDragger } from '@/composables/useDragger';
import { useLayerByID } from '@/composables/useLayerByID';
import { usePosition } from '@/composables/usePosition';
import { buildResizerPosition, useResizer } from '@/composables/useResizer';
import { useActionsStore } from '@/stores/actions';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const { layerID } = defineProps<{
  layerID: string;
}>();

const { image } = useLayerByID(layerID);

const selectionStore = useSelectionStore();
const { selectedImage } = storeToRefs(selectionStore);
const actionsStore = useActionsStore();
const { mousePosition } = storeToRefs(actionsStore);
const isThisSelected = computed(
  () => selectedImage.value != null && selectedImage.value === image.value!.id
);
const imageRef = ref<HTMLDivElement | null>(null);
const debugMode = false;

const {
  initiaImagePositionInCanvas,
  initiaImagePositionInScreen,
  initialMousePosition,
} = usePosition();

const { localDimensions, resizingThis, onStartResizing } = useResizer({
  imageRef,
  image,
  initiaImagePositionInCanvas,
  initiaImagePositionInScreen,
  initialMousePosition,
});
const { localPosition, draggingThis, onStartDragging } = useDragger({
  image,
  initiaImagePositionInCanvas,
  initiaImagePositionInScreen,
  initialMousePosition,
});

const onResizerMouseDown = (event: PointerEvent) => {
  const position = (event.target as HTMLElement).dataset.name;
  if (position === undefined) {
    throw new Error('Element has no data-name attribute attached');
  }
  onStartResizing(event, position ?? '');
};
</script>
<template>
  <div
    v-if="image"
    class="absolute max-w-none"
    :style="{
      width: `${resizingThis ? localDimensions.width : image!.width}px`,
      height: `${resizingThis ? localDimensions.height : image!.height}px`,
      left: `${draggingThis ? localPosition.x : resizingThis ? localDimensions.x : image!.x}px`,
      top: `${draggingThis ? localPosition.y : resizingThis ? localDimensions.y : image!.y}px`,
    }"
    :draggable="false"
    @dragstart.prevent
    @pointerdown="onStartDragging"
    ref="imageRef"
  >
    <span v-if="debugMode" class="absolute top-0 left-0 z-50 text-black"
      >{{ mousePosition.x }} - {{ initiaImagePositionInScreen.x }} =
      {{ mousePosition.x - initiaImagePositionInScreen.x }}</span
    >
    <img
      :src="image!.data"
      class="absolute max-w-none w-full h-full select-none"
      :draggable="false"
      @dragstart.prevent
    />
    <div
      v-if="image && isThisSelected"
      class="absolute max-w-none w-full h-full border-teal-400 bg-transparent pointer-events-none border-2"
      data-export-ignore
    >
      <div
        :data-name="buildResizerPosition('left', 'top')"
        class="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('center', 'top')"
        class="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('right', 'top')"
        class="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('left', 'center')"
        class="absolute top-1/2 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('right', 'center')"
        class="absolute top-1/2 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('left', 'bottom')"
        class="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('center', 'bottom')"
        class="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
      <div
        :data-name="buildResizerPosition('right', 'bottom')"
        class="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 pointer-events-auto bg-teal-400"
        @pointerdown="onResizerMouseDown"
      ></div>
    </div>
  </div>
</template>
