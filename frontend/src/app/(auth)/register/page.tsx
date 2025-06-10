'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth';
import axios from 'axios';

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (password !== confirmPassword) {
            setErrors({ password_confirmation: ['As senhas não coincidem.'] });
            return;
        }

        try {
            await register({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            router.push('/');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                alert('Erro inesperado');
            }
        }
    };

    const renderError = (field: string) =>
        errors[field] && (
            <p className="text-sm text-red-600">{errors[field][0]}</p>
        );

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
                <h1 className="text-2xl font-bold">Cadastro</h1>

                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="rounded p-2 w-full"
                    />
                    {renderError('name')}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="rounded p-2 w-full"
                    />
                    {renderError('email')}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="rounded p-2 w-full"
                    />
                    {renderError('password')}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className="rounded p-2 w-full"
                    />
                    {renderError('password_confirmation')}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Cadastrar
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Já tem uma conta?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Entrar
                    </a>
                </p>
            </div>
        </div>
    );
}
