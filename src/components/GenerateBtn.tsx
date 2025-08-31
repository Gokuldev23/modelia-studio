type Props = {
    onGenerate: () => void;
    onAbort: () => void;
    loading: boolean;
    attempt: number;
    error:string | null
};

export default function GenerateBtn({ onGenerate, onAbort, loading, attempt ,error }: Props) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onGenerate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            <button
                onClick={onAbort}
                disabled={!loading}
                aria-disabled={!loading}
                className="px-3 py-2 border rounded disabled:opacity-50"
            >
                Abort
            </button>

            <div aria-live="polite" className="text-sm text-gray-600">
                {error ? <span className="text-red-600">Error: {error}</span> : <span>&nbsp;</span>}
            </div>

            {loading && (
                <div role="status" aria-live="polite" className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor"></path>
                    </svg>
                    <span className="sr-only">Loading</span>
                    {attempt > 0 && (
                        <span className="px-4 italic text-sm"> Try Again.. (Attemp - {attempt})</span>
                    )}
                </div>

            )}
        </div>
    )
}
