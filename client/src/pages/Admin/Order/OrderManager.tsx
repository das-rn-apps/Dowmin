import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { useOrderStore } from '../../../store/orderStore';
import OrderTable from './OrderTable';
import OrderModal from './OrderModal';
import { Plus } from 'lucide-react';

export default function OrderManager() {
    const { orders, setOrders } = useOrderStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchOrders = async () => {
        const res = await axios.get('/orders');
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📦 Order List</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                    <Plus className="w-4 h-4" />
                    Add Order
                </button>
            </div>

            <OrderTable
                orders={orders}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
            />

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchOrders}
            />
        </div>
    );
}
