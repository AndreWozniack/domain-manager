'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';

export default function LoginPage() {
    const { login, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);


    const handle = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Erro');
        }
    };

    const handleSubmit = async () => {
        try {
            await login(email, password);
            router.replace('/');
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Erro');
        }
    };

    return (
        <form onSubmit={handle} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-600">{error}</p>}
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha"/>
            <button className="bg-blue-600 text-white py-2 rounded">Entrar</button>
        </form>
    );
}
