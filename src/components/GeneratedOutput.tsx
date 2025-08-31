import type { Generation } from '../js/types'


type Props = {
    currentGeneration: Generation | null
}

export default function GeneratedOutput({ currentGeneration }:Props) {
  return (
      <div className="mt-4 border p-4 rounded">
          <h2 className="font-semibold">Output Preview</h2>
          {currentGeneration ? (
              <div className="mt-2">
                  <img src={currentGeneration.imageUrl} alt="Generated" className="w-full object-contain max-h-96" />
                  <div className="mt-2">
                      <div className="text-sm font-medium">{currentGeneration.prompt}</div>
                      <div className="text-xs text-gray-500">{currentGeneration.style}</div>
                      <div className="text-xs text-gray-400">{new Date(currentGeneration.createdAt).toLocaleString()}</div>
                  </div>
              </div>
          ) : (
              <div className="text-gray-500 mt-2">No generation yet</div>
          )}
      </div>
  )
}
