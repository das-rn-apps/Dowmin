import OrderStatusBadge from './OrderStatusBadge';

interface Props {
    orders: any[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
}

export default function OrderTable({
    orders,
    currentPage,
    setCurrentPage,
    itemsPerPage,
}: Props) {
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentItems = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div className="overflow-x-auto rounded-sm border border-orange-200">
                <table className="min-w-full text-xs text-gray-800">
                    <thead className="bg-orange-500">
                        <tr>
                            <th className="px-2 py-1 text-left font-semibold">User</th>
                            <th className="px-2 py-1 text-left font-semibold">Total (Rs)</th>
                            <th className="px-2 py-1 text-left font-semibold">Date</th>
                            <th className="px-2 py-1 text-left font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((order) => (
                            <tr key={order._id} className="hover:bg-orange-400">
                                <td className="p-2">{order.user?.name || 'Guest'}</td>
                                <td className="p-2 font-semibold">{order.totalAmount}</td>
                                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-2">
                                    <OrderStatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-3 gap-1 text-xs">
                <button
                    onClick={() => setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-2 py-1 rounded ${currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1 > totalPages ? totalPages : currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}
