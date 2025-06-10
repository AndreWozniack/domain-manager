'use client';

import { useState, useEffect } from 'react';
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

export default function Page() {
    const router = useRouter();
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loading, setLoading] = useState(true);

    const [formOpen, setFormOpen] = useState(false);
    const [editingDomain, setEditingDomain] = useState<Domain | undefined>();

    useEffect(() => {
        getDomains()
            .then(setDomains)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando domínios…</p>;

    const handleLogout = async () => {
        await logout();
        router.push('/login');
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

    return (
        <RequireAuth>
            <div className="max-w-1/2 mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Meus Domínios</h1>
                </div>

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
                    items={domains}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

        </RequireAuth>
    );
}
