<script setup lang="ts">
import ToolsComponent from '@/components/canvas/ToolsComponent.vue';
import CanvasComponent from '@/components/canvas/CanvasComponent.vue';
</script>

<template>
  <main class="min-h-screen w-full flex items-center justify-center relative">
    <CanvasComponent />
    <div class="absolute bottom-2 left-0 right-0 flex place-content-center">
      <ToolsComponent />
    </div>
  </main>
</template>
