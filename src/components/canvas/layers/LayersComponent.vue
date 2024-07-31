<script setup lang="ts">
import { useLayers } from '@/composables/useLayers';
import SingleLayerComponent from './SingleLayerComponent.vue';
import { computed } from 'vue';
const { layerIDs } = useLayers();
const hasLayers = computed(() => !!layerIDs.value.length);
// showing layers in reversed order to keep upper layers first
const reversedLayerIDs = computed(() => layerIDs.value.slice().reverse());
</script>
<template>
  <div
    v-if="hasLayers"
    class="border-2 border-gray-700 bg-background rounded-md p-4"
  >
    <SingleLayerComponent
      v-for="layerID in reversedLayerIDs"
      :key="layerID"
      :layerID
    />
  </div>
</template>
