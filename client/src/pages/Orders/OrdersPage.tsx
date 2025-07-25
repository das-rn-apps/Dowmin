import { useEffect } from 'react';
import axios from '../../utils/axios';
import { useOrderStore } from '../../store/orderStore';


export default function OrdersPage() {
    const { orders, setOrders } = useOrderStore();

    useEffect(() => {
        if (orders.length === 0)
            axios.get('/orders/my').then((res) => setOrders(res.data));
    }, []);

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="border p-4 mb-4 rounded shadow">
                        <p className="text-sm text-gray-500 mb-2">
                            Order ID: <span className="font-mono">{order._id}</span>
                        </p>
                        <ul className="mb-2">
                            {order.items.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>₹{item.product.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-semibold mt-2">
                            <span>Total: ₹{order.totalAmount}</span>
                            <span>Status: {order.status}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
