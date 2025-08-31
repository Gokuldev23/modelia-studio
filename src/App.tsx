import { useState } from "react";
import type { Generation, StyleOption } from "./js/types";
import { useImgGeneration } from "./hooks/useImgGeneration"
import { loadGenerations, saveGeneration } from "./js/storage";

import UploadPreview from "./components/UploadPreview"
import PromptStyleForm from "./components/PromptStyleForm";
import GenerateBtn from "./components/GenerateBtn";
import GeneratedOutput from "./components/GeneratedOutput";
import HistoryList from "./components/History";


type PromptFormType = {
  prompt: string,
  style: StyleOption
}


function App() {
  
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const [history, setHistory] = useState<Generation[]>(() => loadGenerations());

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

  const saveHistory = (gen:Generation) => {
    setHistory((h) => {
      const next = [gen, ...h.filter((x) => x.id !== gen.id)].slice(0, 5);
      saveGeneration(gen); // localStorage
      return next;
    });
  }

  const handleRestore = (g: Generation) => {
    setCurrentGeneration(g);
    setImageDataUrl(g.imageUrl);
    handleSetPromptForm('prompt', g.prompt);
    handleSetPromptForm('style', g.style);
  };

  const handleGenerate = async () => {
    if (!imageDataUrl) {
      alert('Upload an image first');
      return;
    }
    if(!promptForm.prompt) {
      alert("Prompt is Empty")
      return;
    }
    try {
      const gen = await generate({ imageDataUrl, prompt:promptForm.prompt, style:promptForm.style });
      setCurrentGeneration(gen);
      saveHistory(gen)
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
    <div className="max-w-4xl mx-auto lg:py-10 md:py-5 py-3 px-4">
      <header>
        <h1 className="text-2xl font-bold">Modelia — AI (Mock)</h1>
      </header>
      <main className="grid lg:grid-cols-[auto_250px] gap-8 relative">
        <div>
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
        </div>
        <HistoryList items={history} onRestore={handleRestore}/>
      </main>
    </div>
  )
}

export default App
