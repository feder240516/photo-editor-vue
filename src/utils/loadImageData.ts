type LoadImageDataResult = {
  filename: string;
  data: string;
  height: number;
  width: number;
};

export default function loadImageData(file: File) {
  return new Promise<LoadImageDataResult>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const image = new Image();
      image.onload = () => {
        resolve({
          filename: file.name,
          data: fileReader.result as string,
          height: image.naturalHeight,
          width: image.naturalWidth,
        });
      };
      image.onerror = (_event, _source, _lineno, _colno, error) => {
        reject(error);
      };
      image.src = fileReader.result as string;
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
    fileReader.readAsDataURL(file);
  });
}
