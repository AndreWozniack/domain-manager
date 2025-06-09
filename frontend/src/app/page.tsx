'use client'
import { useState, useEffect } from 'react'
import List, { Domain } from '@/components/List'
import { fetchDomains } from '@/services/domainService'
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
    const [domains, setDomains] = useState<Domain[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDomains()
            .then(domains => setDomains(domains))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Carregando domínios…</p>

    function editDomain(domain: Domain) {
        console.log('Editando domínio:', domain.domain);
    }

    function deleteDomain(domain: Domain) {
        console.log("Deletando domínio:", domain.domain);
    }

    return (
        <RequireAuth>


        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Meus Domínios</h1>
            <List
                items={domains}
                onEdit={editDomain}
                onDelete={deleteDomain}
            />

            <div className="mt-4">
                <button
                    onClick={() => console.log('Adicionar novo domínio')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Adicionar Domínio
                </button>
            </div>

        </div>
        </RequireAuth>
    )
}


