import type { StyleOption } from "../js/types";



type Props = {
    prompt: string;
    setPrompt: (s: string) => void;
    style: StyleOption;
    setStyle: (s: StyleOption) => void;
};


export default function PromptStyleForm({ prompt, setPrompt, style, setStyle }: Props) {

    const StyleOptionsArr: StyleOption[] = ['Editorial', 'Streetwear', 'Vintage'];


    return (
        <form className="space-y-2 my-4">
            <label className="block">
                <span className="text-sm font-medium">Prompt</span>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}  // Todo validationn
                    placeholder="Describe the look (e.g., 'red silk top with moody lighting')"
                    className="mt-1 w-full rounded border px-3 py-2"
                    aria-label="Prompt"
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium">Style</span>
                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as StyleOption)}
                    className="mt-1 w-full rounded border px-3 py-2"
                    aria-label="Style"
                >
                    {StyleOptionsArr.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </label>

            <div aria-live="polite"
                aria-atomic="false"
                role="status"
                className="p-2 border rounded bg-white">
                <div className="text-xs text-gray-500">Live Summary</div>
                <div className="text-sm font-medium">{prompt || 'No prompt'}</div>
                <div className="text-xs text-gray-600">{style}</div>
            </div>
        </form>
    )
}
