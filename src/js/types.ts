export type StyleOption = "Editorial" | "Streetwear" | "Vintage";

export type Generation = {
  id: string;
  imageUrl: string; 
  prompt: string;
  style: StyleOption;
  createdAt: string;
};

export type Payload = {
  imageDataUrl: string;
  prompt: string;
  style: string;
  signal?: AbortSignal;
};