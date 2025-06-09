import api from './axios';

export type Domain = {
    id: number;
    nome: string;
    dominio: string;
    cliente?: string;
    ativo: boolean;
    data_registro?: string;
    data_expiracao?: string;
    observacoes?: string;
};

export type DomainInput = {
    nome: string;
    dominio: string;
    cliente?: string;
    ativo?: boolean;
    data_registro?: string;
    data_expiracao?: string;
    observacoes?: string;
};


export const getDomains = async (): Promise<Domain[]> => {
    const res = await api.get<{ data: Domain[] }>('/api/dominios');
    return res.data.data;
};

export const createDomain = async (payload: DomainInput): Promise<Domain> => {
    const res = await api.post<{ data: Domain }>('/api/dominios', payload);
    return res.data.data;
};

export const updateDomain = async (id: number, payload: DomainInput): Promise<Domain> => {
    const res = await api.put<{ data: Domain }>(`/api/dominios/${id}`, payload);
    return res.data.data;
};

export const deleteDomain = async (id: number): Promise<void> => {
    await api.delete(`/api/dominios/${id}`);
};
