import { Domain } from '@/components/List'

export async function fetchDomains(): Promise<Domain[]> {
    const res = await fetch('http://localhost:8080/api/dominios')
    if (!res.ok) throw new Error('Erro ao buscar domínios')
    const { data } = await res.json()
    return data.map((d: any) => ({
        id:            d.id,
        name:          d.nome,
        domain:        d.dominio,
        client:        d.cliente,
        active:        d.ativo,
        registry_date: d.data_registro,
        expiration_date: d.data_expiracao,
        observations:  d.observacoes ?? '',
    }))
}
