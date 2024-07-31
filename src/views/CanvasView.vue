<script setup lang="ts">
import ToolsComponent from '@/components/canvas/tools/ToolsComponent.vue';
import CanvasComponent from '@/components/canvas/CanvasComponent.vue';
import LayersComponent from '@/components/canvas/layers/LayersComponent.vue';
import { useToolsStore } from '@/stores/tools';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useMobileMediaQuery } from '@/composables/useMediaQuery';

const toolsStore = useToolsStore();
const { showLayersMenu } = storeToRefs(toolsStore);
const matchesMobileMediaQuery = useMobileMediaQuery();
const shouldShowLayersMenu = computed(() => {
  return !matchesMobileMediaQuery.value || showLayersMenu.value;
});
</script>

<template>
  <main
    class="min-h-screen w-full flex flex-col items-center justify-center relative"
  >
    <div class="flex items-center gap-4">
      <CanvasComponent />
      <div
        class="fixed max-lg:bottom-0 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:relative max-lg:w-max max-lg:max-w-full max-lg:flex max-lg:flex-col items-center"
      >
        <LayersComponent v-if="shouldShowLayersMenu" />
        <div
          class="lg:hidden w-full text-center border-2 border-gray-700 bg-background rounded-md p-4"
        >
          <ToolsComponent show-layers-tool />
        </div>
      </div>
    </div>
    <div class="max-lg:hidden">
      <ToolsComponent />
    </div>
    <div
      class="absolute bottom-2 left-0 right-0 flex place-content-center"
    ></div>
  </main>
</template>
