'use client';

import {useEffect, useState} from 'react';
import {getDomains, deleteDomain, Domain} from '@/services/domainService';
import RequireAuth from './RequireAuth';

interface ListProps {
    items: Domain[];
    onEdit: (domain: Domain) => void;
    onDelete: (domain: Domain) => void | Promise<void>;
}

export default function List({items}: ListProps) {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDomains()
            .then(setDomains)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando…</p>;

    const handleDelete = async (id: number) => {
        if (!confirm('Excluir este domínio?')) return;
        await deleteDomain(id);
        setDomains(domains.filter(d => d.id !== id));
    };

    return (
        <RequireAuth>
            <div className="space-y-2">
                {domains.map(d => (
                    <div key={d.id} className="flex justify-between p-2 border rounded">
                        <div>
                            <strong>{d.nome}</strong> — {d.dominio}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => {/* abrir modal de edição */
                            }}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(d.id)}>
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </RequireAuth>
    );
}
