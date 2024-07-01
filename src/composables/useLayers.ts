import { useImagesStore, type AddImageArgs } from '@/stores/images';
import { useLayersStore, type AddLayerArgs } from '@/stores/layers';
import { storeToRefs } from 'pinia';

type AddBareLayerArgs = Omit<AddLayerArgs, 'imageID'>;

export function useLayers() {
  const layersStore = useLayersStore();
  const { addLayer, moveLayerTo } = layersStore;
  const { layerIDs } = storeToRefs(layersStore);
  const { addImage } = useImagesStore();
  function addLayerForImage(image: AddImageArgs, layer: AddBareLayerArgs) {
    const newImage = addImage(image);
    addLayer({ ...layer, imageID: newImage.id });
  }
  return { layerIDs, addLayerForImage, moveLayerTo };
}
