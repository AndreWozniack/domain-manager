export default function List({ items }: { items: string[] }) {
    return (
        <ul className="list-disc list-inside space-y-4">
            {items.map((item, i) => (
                <li key={i} className="bg-gray-100 p-2 rounded">
                    {item}
                </li>
            ))}
        </ul>
    );
}
