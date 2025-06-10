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
                            <strong>{d.dominio}</strong> — {d.nome}
                        </div>
                        <div className="space-x-2">
                            <button className="p-3 rounded-2xl bg-blue-600 text-amber-50" onClick={() => onEdit(d)}>
                                Editar
                            </button>
                            <button className="p-3 rounded-2xl bg-red-700 text-amber-50" onClick={() => onDelete(d)}>
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </RequireAuth>
    );
}