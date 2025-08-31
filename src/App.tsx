import { useState } from "react";
import type { Generation, StyleOption } from "./js/types";
import { useImgGeneration } from "./hooks/useImgGeneration"
import UploadPreview from "./components/UploadPreview"
import PromptStyleForm from "./components/PromptStyleForm";
import GenerateBtn from "./components/GenerateBtn";
import GeneratedOutput from "./components/GeneratedOutput";


type PromptFormType = {
  prompt: string,
  style: StyleOption
}


function App() {
  
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const { generate, loading, error, abort, attempt } = useImgGeneration();

  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);

  const [promptForm, setPromptForm] = useState<PromptFormType>({
    prompt: '',
    style: 'Editorial'
  })

  const handleSetPromptForm = (key: keyof PromptFormType, value: string) => {
    setPromptForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleGenerate = async () => {
    if (!imageDataUrl) {
      alert('Upload an image first');
      return;
    }
    try {
      const gen = await generate({ imageDataUrl, prompt:promptForm.prompt, style:promptForm.style });
      setCurrentGeneration(gen);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "name" in err &&
        (err as { name?: string }).name === "AbortError"
      )
        console.error('Generation failed', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto lg:py-10 md:py-5 py-3">
      <header>
        <h1 className="text-2xl font-bold">Modelia — Mini AI Studio (Mock)</h1>
      </header>
      <main>
        <UploadPreview onImageReady={setImageDataUrl} currentImage={imageDataUrl} />
        <PromptStyleForm
          prompt={promptForm.prompt}
          style={promptForm.style}
          setPrompt={(val) => handleSetPromptForm("prompt", val)}
          setStyle={(val) => handleSetPromptForm("style", val)}
        />
        <GenerateBtn
          onGenerate={handleGenerate}
          loading={loading}
          error={error}
          onAbort={abort}
          attempt={attempt}
        />
        <GeneratedOutput currentGeneration={currentGeneration}/>
      </main>
    </div>
  )
}

export default App
