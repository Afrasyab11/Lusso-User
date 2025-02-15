export const getCroppedImg = (imageSrc: string, cropper: any): Promise<File> => {
  return new Promise((resolve, reject) => {
      try {
          const canvas = cropper.getCroppedCanvas();
          if (!canvas) {
              reject("Failed to create a cropped canvas");
              return;
          }

          canvas.toBlob((blob: BlobPart) => {
              if (!blob) {
                  reject("Failed to create blob from canvas");
                  return;
              }
              const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
              resolve(file);
          }, "image/jpeg");
      } catch (error) {
          reject(error);
      }
  });
};



// export const getCroppedImg = async (
//     imageSrc: string,
//     croppedAreaPixels: any,
//     fileName: string = 'cropped-image.jpg',
//   ): Promise<File> => {
//     const image = new Image();
//     image.src = imageSrc;
  
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
  
//     canvas.width = croppedAreaPixels.width;
//     canvas.height = croppedAreaPixels.height;
  
//     // Ensure the image is loaded before drawing
//     await new Promise<void>(resolve => {
//       image.onload = () => resolve();
//     });
  
//     ctx!.drawImage(
//       image,
//       croppedAreaPixels.x,
//       croppedAreaPixels.y,
//       croppedAreaPixels.width,
//       croppedAreaPixels.height,
//       0,
//       0,
//       croppedAreaPixels.width,
//       croppedAreaPixels.height,
//     );
  
//     return new Promise<File>((resolve, reject) => {
//       canvas.toBlob(blob => {
//         if (blob) {
//           // Create a File object from the blob
//           const file = new File([blob], fileName, {type: 'image/jpeg'});
//           resolve(file);
//         } else {
//           reject(new Error('Failed to convert canvas to blob'));
//         }
//       }, 'image/jpeg');
//     });
//   };
  