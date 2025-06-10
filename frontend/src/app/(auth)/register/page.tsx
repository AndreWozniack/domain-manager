'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/register', { name, email, password }, { withCredentials: true });
            router.push('/');
        } catch (err) {
            console.error(err);
            alert('Erro ao cadastrar usuário.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Cadastro</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required className="border rounded p-2 w-full"/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border rounded p-2 w-full"/>
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="border rounded p-2 w-full"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cadastrar</button>
            </form>
        </div>
    );
}
