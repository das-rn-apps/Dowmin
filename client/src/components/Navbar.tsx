import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingCart,
    LogIn,
    LayoutDashboard,
    Home as HomeIcon,
    UserCircle,
    LogOut,
    ClipboardList,
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export default function Navbar() {
    const { items } = useCartStore();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const isAdmin = user?.isAdmin;
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-orange-400 to-orange-500 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center text-white">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-red-800 hover:text-yellow-200 flex items-center gap-2 transition"
                >
                    <HomeIcon className="w-6 h-6" /> Dowmin
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-6 relative">

                    {/* Normal User Section */}
                    {!isAdmin && (
                        <>
                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative hover:text-yellow-200 transition"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {items.length}
                                    </span>
                                )}
                            </Link>

                            {/* If NOT logged in */}
                            {!user ? (
                                <Link
                                    to="/login"
                                    className="hover:text-yellow-200 flex items-center gap-1 transition"
                                >
                                    <LogIn className="w-5 h-5" /> Login
                                </Link>
                            ) : (
                                // If LOGGED IN - Dropdown
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-1 hover:text-yellow-200 transition"
                                        onClick={() => setShowMenu((prev) => !prev)}
                                    >
                                        <UserCircle className="w-6 h-6" />
                                        {user.name}
                                    </button>

                                    {showMenu && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
                                            <div className="px-4 py-2 text-sm font-semibold bg-gray-50 border-b border-gray-200">
                                                Hello, {user.name}
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setShowMenu(false);
                                                    navigate('/orders');
                                                }}
                                                className="w-full px-4 py-3 text-sm text-left hover:bg-orange-100 flex items-center gap-2 transition-colors"
                                            >
                                                <ClipboardList className="w-4 h-4 text-orange-500" />
                                                My Orders
                                            </button>

                                            <hr className="border-gray-200" />

                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-3 text-sm text-left hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Admin Panel Dropdown */}
                    {isAdmin && user && (
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 hover:text-yellow-200 transition"
                                onClick={() => setShowMenu((prev) => !prev)}
                            >
                                <UserCircle className="w-6 h-6" />
                                {user.name}
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
                                    <div className="px-4 py-2 text-sm font-semibold bg-gray-50 border-b border-gray-200">
                                        Admin, {user.name}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            navigate('/admin');
                                        }}
                                        className="w-full px-4 py-3 text-sm text-left hover:bg-orange-100 flex items-center gap-2 transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-orange-500" />
                                        Admin Panel
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-3 text-sm text-left hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
