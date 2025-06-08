export default function Button({children, onClick,}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-primary rounded hover:bg-blue-900 p-8"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
