'use client';

import { useState } from 'react';
import { Domain, DomainInput } from '@/services/domainService';

type Props = {
    initial?: Domain;
    onSubmit: (payload: DomainInput) => Promise<void>;
};

export default function DomainForm({ initial, onSubmit }: Props) {
    const [nome, setNome] = useState(initial?.nome ?? '');
    const [dominio, setDominio] = useState(initial?.dominio ?? '');
    const [cliente, setCliente] = useState(initial?.cliente ?? '');
    const [ativo, setAtivo] = useState(initial?.ativo ?? true);
    const [dataRegistro, setDataRegistro] = useState(
        initial?.data_registro ?? ''
    );
    const [dataExpiracao, setDataExpiracao] = useState(
        initial?.data_expiracao ?? ''
    );
    const [observacoes, setObservacoes] = useState(
        initial?.observacoes ?? ''
    );

    const isEdit = Boolean(initial?.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: DomainInput = {
            nome,
            dominio,
            cliente: cliente || undefined,
            ativo,
            data_registro: dataRegistro || undefined,
            data_expiracao: dataExpiracao || undefined,
            observacoes: observacoes || undefined,
        };

        await onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-medium">Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Domínio</label>
                <input
                    type="text"
                    value={dominio}
                    onChange={(e) => setDominio(e.target.value)}
                    required
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Cliente</label>
                <input
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div className="flex items-center">
                <input
                    id="ativo"
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="ativo" className="font-medium">
                    Ativo
                </label>
            </div>

            <div>
                <label className="block mb-1 font-medium">Data de Registro</label>
                <input
                    type="date"
                    value={dataRegistro}
                    onChange={(e) => setDataRegistro(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Data de Expiração</label>
                <input
                    type="date"
                    value={dataExpiracao}
                    onChange={(e) => setDataExpiracao(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Observações</label>
                <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                    rows={3}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {isEdit ? 'Atualizar' : 'Criar'}
            </button>
        </form>
    );
}
