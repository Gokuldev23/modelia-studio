import { useRef } from 'react'
import { downscaleImageFile } from '../js/utils';


type Props = {
    onImageReady: (dataUrl: string) => void;
    currentImage?: string | null;
};


export default function UploadPreview({currentImage,onImageReady}:Props) {

    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const dataUrl = await downscaleImageFile(file);
            onImageReady(dataUrl);
        } catch (err) {
            alert('Failed to process image: ' + String(err));
        }
    }

    return (
        <div className="space-y-2">
            <label className="block w-fit rounded-2xl my-4">
                <span className="sr-only">Upload image</span>
                <input
                    ref={fileRef}
                    aria-label="Upload image"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                    className="focus:outline-2 focus:outline-amber-500 border px-4 py-1 w-full rounded-2xl"
                />
            </label>

            <div
                role="region"
                aria-live="polite"
                aria-label="Image preview"
                className="lg:h-48 h-32 aspect-video  border rounded-xl shadow shadow-slate-700 flex items-center justify-center overflow-hidden bg-slate-800"
            >
                {currentImage ? (
                    <img src={currentImage} alt="Preview" className="object-contain max-h-full" />
                ) : (
                    <div className="text-gray-400">No image selected</div>
                )}
            </div>
        </div>
    );
}
