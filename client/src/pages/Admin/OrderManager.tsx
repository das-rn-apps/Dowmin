import { useEffect } from 'react';
import { useOrderStore } from '../../store/orderStore';

export default function OrderManager() {
    const { orders, fetchOrders } = useOrderStore();

    useEffect(() => {
        if (orders.length === 0)
            fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">📑 All Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="border p-4 mb-4 rounded shadow">
                    <p className="text-sm text-gray-500">User: {order.user?.name}</p>
                    <ul>
                        {order.items.map((item, i) => (
                            <li key={i} className="flex justify-between text-sm">
                                <span>
                                    {item.product.name} x {item.quantity}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-semibold mt-2">Total: ₹{order.totalAmount}</p>
                    <p className="text-sm text-blue-600">Status: {order.status}</p>
                </div>
            ))}
        </div>
    );
}
