import { ref } from 'vue';

export type PositionCoords = { x: number; y: number };

export function usePosition() {
  const initiaImagePositionInCanvas = ref<PositionCoords>({ x: 0, y: 0 });
  const initiaImagePositionInScreen = ref<PositionCoords>({ x: 0, y: 0 });
  const initialMousePosition = ref<PositionCoords>({ x: 0, y: 0 });
  return {
    initiaImagePositionInCanvas,
    initiaImagePositionInScreen,
    initialMousePosition,
  };
}
