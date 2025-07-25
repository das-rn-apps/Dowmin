import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import ProductManager from './ProductManager';
import OrderManager from './Order/OrderManager';
import { ShoppingBag, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductManager from './Product/ProductManager';

export default function AdminPanel() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'products' | 'orders'>('products');
    const [collapsed, setCollapsed] = useState(false);

    if (!user?.isAdmin) {
        navigate('/');
        return null;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`transition-all duration-300 bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl text-white flex flex-col
                ${collapsed ? 'w-20' : 'w-64'}`}
            >
                {/* Header */}
                <div className="p-3 border-b border-orange-300 flex items-center justify-between">
                    {!collapsed && (
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tight">Admin</h2>
                            <p className="text-xs text-orange-100">Welcome back</p>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white hover:text-orange-200 transition"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 px-2 py-6 text-sm font-medium">
                    <button
                        onClick={() => setTab('products')}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                            ${tab === 'products'
                                ? 'bg-white text-orange-700 shadow font-semibold'
                                : 'hover:bg-orange-400 hover:text-white text-orange-100'}
                        `}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {!collapsed && <span>Manage Products</span>}
                    </button>

                    <button
                        onClick={() => setTab('orders')}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                            ${tab === 'orders'
                                ? 'bg-white text-orange-700 shadow font-semibold'
                                : 'hover:bg-orange-400 hover:text-white text-orange-100'}
                        `}
                    >
                        <ClipboardList className="w-5 h-5" />
                        {!collapsed && <span>Manage Orders</span>}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {tab === 'products' && <ProductManager />}
                {tab === 'orders' && <OrderManager />}
            </main>
        </div>
    );
}
