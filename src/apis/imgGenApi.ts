import type { Generation, Payload } from "../js/types";





export async function imageGenApi(req: Payload): Promise<Generation> {
  const { imageDataUrl, prompt, style, signal } = req;

  const delay = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      const id = setTimeout(resolve, ms);
      if (signal) {
        signal.addEventListener(
          "abort",
          () => {
            clearTimeout(id);
            reject(new DOMException("Aborted", "AbortError"));
          },
          { once: true }
        );
      }
    });

  await delay(1000 + Math.floor(Math.random() * 1000));

  if (Math.random() < 0.2) {   // 20% of Time Failure - Increase to see the effect often 
    console.log("Error in Randomness");
    throw new Error("Model overloaded");
  }

  const result: Generation = {
    id: crypto.randomUUID(),
    imageUrl: imageDataUrl,
    prompt,
    style: style as Generation["style"],
    createdAt: new Date().toISOString(),
  };

  return result;
}