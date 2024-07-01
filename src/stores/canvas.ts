import html2canvas from 'html2canvas';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCanvasStore = defineStore('canvas', () => {
  const canvasRef = ref<HTMLDivElement | null>(null);
  const width = ref(640);
  const height = ref(640);

  async function exportImage() {
    const editor = canvasRef.value;
    if (!editor) return;

    const canvas = await html2canvas(editor, {
      ignoreElements: (element) => {
        return element.hasAttribute('data-export-ignore');
      },
      backgroundColor: 'transparent',
    });
    document.body.appendChild(canvas);

    const mimeType = 'image/png';
    const fileName = 'exported_image.png';

    const imageUrl = canvas.toDataURL(mimeType);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  }
  return { canvasRef, width, height, exportImage };
});
