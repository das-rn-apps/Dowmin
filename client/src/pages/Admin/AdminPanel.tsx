import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';

export default function AdminPanel() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'products' | 'orders'>('products');

    if (!user?.isAdmin) {
        console.log("Go to home", user)
        navigate('/');
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">👑 Admin Panel</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setTab('products')}
                    className={`px-4 py-2 rounded ${tab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Manage Products
                </button>
                <button
                    onClick={() => setTab('orders')}
                    className={`px-4 py-2 rounded ${tab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Manage Orders
                </button>
            </div>

            {tab === 'products' ? <ProductManager /> : <OrderManager />}
        </div>
    );
}
