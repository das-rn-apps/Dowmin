import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const OrderSubmit = async () => {
        await axios.post('/orders', {
            items: items.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
            })),
            totalAmount,
        });
        clearCart();
        alert('🎉 Order placed successfully!');
        navigate('/orders');
    }

    useEffect(() => {
        if (items.length === 0) navigate('/cart');
        // eslint-disable-next-line
    }, []);

    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">💳 Checkout</h1>
            <p className="mb-2">Total to Pay: <strong>₹{totalAmount}</strong></p>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={OrderSubmit}
            >
                Pay and order
            </button>
        </div>
    );
}
