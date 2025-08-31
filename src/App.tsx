import { useState } from "react";
import type { StyleOption } from "./js/types";
import UploadPreview from "./components/UploadPreview"
import PromptStyleForm from "./components/PromptStyleForm";


type PromptFormType = {
  prompt:string,
  style:StyleOption
}


function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const [promptForm,setPromptForm] = useState<PromptFormType>({
    prompt:'',
    style:'Editorial'
  })

  const handleSetPromptForm = (key: keyof PromptFormType, value: string) => {
    setPromptForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto lg:py-10 md:py-5 py-3">
      <header>
        <h1 className="text-2xl font-bold">Modelia — Mini AI Studio (Mock)</h1>
      </header>
      <main>
          <UploadPreview onImageReady={setImageDataUrl} currentImage={imageDataUrl}/>
          <PromptStyleForm
            prompt={promptForm.prompt}
            style={promptForm.style}
            setPrompt={(val) => handleSetPromptForm("prompt", val)}
            setStyle={(val) => handleSetPromptForm("style", val)}
          />
      </main>
    </div>
  )
}

export default App
