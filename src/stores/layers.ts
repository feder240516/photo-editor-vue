import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export type AddLayerArgs = { name?: string; imageID: string };

export const useLayersStore = defineStore('layers', () => {
  const layers = ref<
    Record<
      string,
      {
        id: string;
        name: string;
        imageID: string;
      }
    >
  >({});

  const layerIDs = ref<string[]>([]);

  function addLayer({ name, imageID }: AddLayerArgs) {
    const id = `layer_${uuid()}`;
    layers.value[id] = {
      id,
      name: name || 'New layer',
      imageID,
    };
    layerIDs.value.push(id);
  }

  function moveLayerTo(layerID: string, position: number) {
    const index = layerIDs.value.findIndex((id) => id === layerID);
    const lastElementPosition = layerIDs.value.length - 1;
    if (index !== -1 && position >= 0 && position <= lastElementPosition) {
      const targetPosition = Math.max(
        0,
        Math.min(lastElementPosition, position)
      );
      layerIDs.value.splice(index, 1);
      layerIDs.value.splice(targetPosition, 0, layerID);
    }
  }

  function moveLayerUp(layerID: string) {
    const index = layerIDs.value.findIndex((id) => id === layerID);
    if (index !== -1) {
      moveLayerTo(layerID, index + 1);
    }
  }

  function moveLayerDown(layerID: string) {
    const index = layerIDs.value.findIndex((id) => id === layerID);
    if (index !== -1) {
      moveLayerTo(layerID, index - 1);
    }
  }

  function removeLayer(layerID: string) {
    layerIDs.value = layerIDs.value.filter((id) => id !== layerID);
    delete layers.value[layerID];
  }

  function getLayerByID(layerID: string) {
    return layers.value[layerID];
  }

  return {
    layers,
    layerIDs,
    getLayerByID,
    addLayer,
    moveLayerTo,
    moveLayerUp,
    moveLayerDown,
    removeLayer,
  };
});
