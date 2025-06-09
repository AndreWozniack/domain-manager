import api from './axios';

export async function csrf() {
    await api.get('/api/sanctum/csrf-cookie');
}

export async function register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) {
    await csrf();
    return api.post('/api/register', data);
}

export async function login(email: string, password: string) {
    await csrf();
    return api.post('/api/login', { email, password });
}

export async function logout() {
    return api.post('/api/logout');
}

export async function me() {
    return api.get('/api/me');
}
