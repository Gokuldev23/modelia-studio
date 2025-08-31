import { useState } from "react";
import UploadPreview from "./components/UploadPreview"



function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto lg:py-10 md:py-5 py-3">
      <header>
        <h1 className="text-2xl font-bold">Modelia — Mini AI Studio (Mock)</h1>
      </header>
      <main>
          <UploadPreview onImageReady={setImageDataUrl} currentImage={imageDataUrl}/>
      </main>
    </div>
  )
}

export default App
