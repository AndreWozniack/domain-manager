import React from 'react'
import Button from './Button'

export interface Domain {
    id: number | string
    name: string
    domain: string
    client: string
    active: boolean
    registry_date: string
    expiration_date: string
    observations: string
}

interface ListProps {
    items: Domain[]
    onEdit: (domain: Domain) => void
    onDelete: (domain: Domain) => void
}

export default function List({ items, onEdit, onDelete }: ListProps) {
    return (
        <ul className="space-y-4">
            {items.map((domain) => (
                <li
                    key={domain.id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded"
                >
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{domain.name}</h3>
                        <p className="text-sm text-gray-600">{domain.domain}</p>
                    </div>

                    <div className="flex space-x-2">
                        # Adicionar menu com tres pontinhos que abre as ações
                        <Button onClick={() => onEdit(domain)}>Editar</Button>
                        <Button onClick={() => onDelete(domain)}>Deletar</Button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
