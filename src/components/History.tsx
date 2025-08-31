import type { Generation } from "../js/types";

type Props = {
    items: Generation[];
    onRestore: (g: Generation) => void;
};

export default function HistoryList({ items, onRestore }: Props) {
    return (
        <aside className="space-y-2">
            <h3 className="text-sm font-semibold">History (last {items.length})</h3>
            <ul className="space-y-2">
                {items.length === 0 && <li className="text-gray-500">No history</li>}
                {items.map((g) => (
                    <li key={g.id}>
                        <button
                            onClick={() => onRestore(g)}
                            className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-50"
                            aria-label={`Restore generation from ${new Date(g.createdAt).toLocaleString()}`}
                        >
                            <img src={g.imageUrl} alt={`History ${g.prompt}`} className="w-12 h-12 object-cover rounded" />
                            <div className="text-sm">
                                <div className="font-medium truncate w-48">{g.prompt}</div>
                                <div className="text-xs text-gray-500">{g.style}</div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
