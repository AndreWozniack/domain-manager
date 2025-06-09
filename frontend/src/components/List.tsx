'use client';

import { Domain, deleteDomain } from '@/services/domainService';
import RequireAuth from './RequireAuth';

interface ListProps {
    items: Domain[];
    onEdit: (domain: Domain) => void;
    onDelete: (domain: Domain) => void | Promise<void>;
}

export default function List({ items, onEdit, onDelete }: ListProps) {
    return (
        <RequireAuth>
            <div className="space-y-2">
                {items.map((d) => (
                    <div key={d.id} className="flex justify-between p-2 border rounded">
                        <div>
                            <strong>{d.nome}</strong> — {d.dominio}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => onEdit(d)}>
                                Editar
                            </button>
                            <button onClick={() => onDelete(d)}>
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </RequireAuth>
    );
}
