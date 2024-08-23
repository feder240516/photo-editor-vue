import { useImagesStore } from '@/stores/images';
import { useLayersStore } from '@/stores/layers';
import { computed } from 'vue';

export function useLayerByID(layerID: string) {
  const layersStore = useLayersStore();
  const { getLayerByID, moveLayerUp, moveLayerDown, removeLayer } = layersStore;
  const imagesStore = useImagesStore();
  const { getImageByID } = imagesStore;
  const layer = getLayerByID(layerID);
  const image = computed(() => {
    const imageID = layer?.imageID;
    if (!imageID) return null;
    return getImageByID(imageID) || null;
  });
  function moveThisLayerUp() {
    moveLayerUp(layerID);
  }
  function moveThisLayerDown() {
    moveLayerDown(layerID);
  }
  function removeThisLayer() {
    removeLayer(layerID);
  }
  return { layer, image, moveThisLayerUp, moveThisLayerDown, removeThisLayer };
}
