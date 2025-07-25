import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart } = useCartStore();
    const navigate = useNavigate();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                🛒 Your Shopping Cart
            </h1>

            {items.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-green-700 font-bold text-md">
                                        ₹{item.price * item.quantity}
                                    </p>
                                </div>
                                <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="mt-2 text-sm flex items-center gap-1 text-red-500 hover:underline"
                                >
                                    <Trash2 className="w-4 h-4" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-6 text-right">
                        <p className="text-xl font-bold text-gray-800">
                            Total Amount: <span className="text-green-600">₹{total}</span>
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-sm font-medium shadow-md transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
