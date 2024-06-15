/**
 * Merges source images into a target image and returns the merged image.
 * The position of source images is determined by reading positioning values
 * from the source image elements (e.g., sources[0].offsetLeft and sources[0].offsetTop).
 *
 * @param target The main image.
 * @param sources Other images to be merged into the main image.
 * @param options An optional configuration object, including a scale factor.
 * @returns An HTMLImageElement representing the merged image.
 */
export default function mergeImages(
  target: HTMLImageElement,
  sources: HTMLImageElement[],
  options?: {
    scale?: number;
    format?: "image/jpeg" | "image/png";
  },
) {
  /**
   * Helper function to calculate scaled dimensions while maintaining the aspect ratio.
   *
   * @param width The original width.
   * @param height The original height.
   * @param scale The scaling factor.
   * @returns An object with the new width and height after scaling.
   */
  const scaleDimensions = (width: number, height: number, scale: number) => {
    const aspect = width / height;
    const newWidth = width * scale;
    const newHeight = newWidth / aspect;
    return {
      width: newWidth,
      height: newHeight,
    };
  };

  // Determine the scaling factor (default to 1 if not provided in options)
  const scale = options?.scale ?? 1;

  // Create a canvas element for image manipulation
  const canvas = document.createElement("canvas");

  // Calculate the new dimensions for the target image after scaling
  const imageWidth = target.width;
  const imageHeight = target.height;
  const { width: newImageWidth, height: newImageHeight } = scaleDimensions(
    imageWidth,
    imageHeight,
    scale,
  );

  // Set the canvas dimensions to match the scaled target image
  canvas.width = newImageWidth;
  canvas.height = newImageHeight;

  // Get the canvas 2D rendering context
  const ctx = canvas?.getContext("2d");

  // Draw the scaled target image on the canvas
  ctx?.drawImage(target, 0, 0, newImageWidth, newImageHeight);

  // Iterate through the source images, scaling and positioning each one on the canvas
  sources.forEach((source) => {
    const { width, height } = scaleDimensions(
      source.width,
      source.height,
      scale,
    );
    const left = source.offsetLeft * scale;
    const top = source.offsetTop * scale;
    ctx?.drawImage(source, left, top, width, height);
  });

  // Create a new image element representing the merged image
  const mergedImage = new Image();
  mergedImage.src = canvas.toDataURL(
    options?.format ? options.format : "image/jpeg",
  );

  // Return the merged image as an HTMLImageElement
  return mergedImage;
}
