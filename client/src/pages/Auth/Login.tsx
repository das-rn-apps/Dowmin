import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import axios from '../../utils/axios';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('@gmail.com');
    const [password, setPassword] = useState('111111');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/auth/login', { email, password });
            login(res.data);
            navigate('/');
        } catch {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-orange-400 p-8 rounded-lg shadow-lg border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back 👋</h2>

                {error && (
                    <div className="bg-red-500 rounded-xs p-2 mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-orange-500 rounded-sm focus:ring-1 focus:ring-orange-600 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-orange-500 rounded-sm focus:ring-1 focus:ring-orange-600 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-900 hover:bg-green-800 text-orange-500 font-medium py-2.5 rounded-md shadow-md transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}
