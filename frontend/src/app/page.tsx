// src/app/page.tsx
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

export default function Page() {
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
            <div className="max-w-xl mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-bold">Meus Domínios</h1>

                {formOpen ? (
                    <div className="p-4 border rounded bg-gray-50 space-y-2">
                        <h2 className="text-xl font-semibold">
                            {editingDomain ? 'Editar Domínio' : 'Novo Domínio'}
                        </h2>

                        <DomainForm
                            initial={editingDomain}
                            onSubmit={handleSubmit}
                        />

                        <button
                            onClick={() => setFormOpen(false)}
                            className="text-gray-600 hover:underline"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Adicionar Domínio
                    </button>
                )}

                <List
                    items={domains}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </RequireAuth>
    );
}