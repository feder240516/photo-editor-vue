<script setup lang="ts">
import ToolsComponent from '@/components/canvas/tools/ToolsComponent.vue';
import CanvasComponent from '@/components/canvas/CanvasComponent.vue';
import LayersComponent from '@/components/canvas/layers/LayersComponent.vue';
</script>

<template>
  <main
    class="min-h-screen w-full flex flex-col items-center justify-center relative"
  >
    <div class="flex items-center gap-4">
      <CanvasComponent />
      <LayersComponent />
    </div>
    <ToolsComponent />
    <div
      class="absolute bottom-2 left-0 right-0 flex place-content-center"
    ></div>
  </main>
</template>
