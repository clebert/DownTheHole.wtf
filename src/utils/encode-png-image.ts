export async function encodePngImage(file: File, maxSize: number): Promise<ArrayBuffer> {
  const image = new Image();

  image.src = URL.createObjectURL(file);

  try {
    await image.decode();
  } finally {
    URL.revokeObjectURL(image.src);
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get 2D context from canvas.");
  }

  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));

  canvas.width = Math.floor(image.width * scale);
  canvas.height = Math.floor(image.height * scale);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) {
    throw new Error("Failed to create image blob.");
  }

  return await blob.arrayBuffer();
}
