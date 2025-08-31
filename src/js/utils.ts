const MAX_DIM = 1920;
const MAX_IMG_QUALITY = 0.85;

export async function downscaleImageFile(
  file: File,
  maxDimension = MAX_DIM
): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Not an image");

  const img = await loadImageFromFile(file);
  const { width, height } = img;

  const longest = Math.max(width, height);
  if (longest <= maxDimension && file.size <= 10 * 1024 * 1024) {
    return fileToDataUrl(file);
  }

  const scale = maxDimension / longest;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", MAX_IMG_QUALITY);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result));
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = String(fr.result);
    };
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

