'use client';

import {useState, useEffect, useRef} from 'react';
import RequireAuth from '@/components/RequireAuth';
import List from '@/components/List';
import DomainForm from '@/components/DomainForm';
import {
    Domain,
    DomainInput,
    getDomains,
    createDomain,
    updateDomain,
    deleteDomain,
} from '@/services/domainService';
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';

export default function Page() {
    const router = useRouter();
    const [domains, setDomains] = useState<Domain[]>([]);
    const [filtered, setFiltered] = useState<Domain[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [editingDomain, setEditingDomain] = useState<Domain | undefined>();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getDomains()
            .then((data) => {
                setDomains(data);
                setFiltered(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const q = query.toLowerCase();
        setFiltered(domains.filter((d) => d.nome.toLowerCase().includes(q)));
    }, [query, domains]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    const handleAddNew = () => {
        setEditingDomain(undefined);
        setFormOpen(true);
    };

    const handleEdit = (domain: Domain) => {
        setEditingDomain(domain);
        setFormOpen(true);
    };

    const handleDelete = async (domain: Domain) => {
        if (!confirm(`Excluir o domínio “${domain.nome}”?`)) return;
        await deleteDomain(domain.id);
        setDomains((curr) => curr.filter((d) => d.id !== domain.id));
    };

    const handleSubmit = async (payload: DomainInput) => {
        if (editingDomain) {
            const updated = await updateDomain(editingDomain.id, payload);
            setDomains((curr) =>
                curr.map((d) => (d.id === updated.id ? updated : d))
            );
        } else {
            const created = await createDomain(payload);
            setDomains((curr) => [created, ...curr]);
        }
        setFormOpen(false);
    };

    if (loading) return (
        <RequireAuth>
            <p>Carregando domínios…</p>
        </RequireAuth>
    )

    return (
        <RequireAuth>
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center relative">
                    <h1 className="text-3xl font-bold">Gerenciado de Domínios</h1>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(prev => !prev)}
                            className="text-gray-600 hover:text-gray-800"
                            title="Configurações"
                        >
                            <Settings className="w-6 h-6"/>
                        </button>

                        {showMenu && (
                            <div
                                className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-gray-700">Total: {filtered.length} domínio(s)</p>
                    <input
                        type="text"
                        placeholder="Buscar domínios..."
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Novo Domínio
                </button>

                {formOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingDomain ? 'Editar Domínio' : 'Novo Domínio'}
                            </h2>

                            <DomainForm
                                initial={editingDomain}
                                onSubmit={handleSubmit}
                            />

                            <button
                                onClick={() => setFormOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
                                aria-label="Fechar"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                <List
                    items={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </RequireAuth>
    );
}

