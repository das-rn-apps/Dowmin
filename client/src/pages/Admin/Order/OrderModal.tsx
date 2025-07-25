import axios from "../../../utils/axios";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function OrderModal({ isOpen, onClose, onSuccess }: Props) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Example placeholder order creation
        const newOrder = {
            user: 'Guest',
            totalAmount: 999,
            status: 'Pending',
        };

        try {
            await axios.post('/orders', newOrder);
            onClose();
            onSuccess();
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">➕ Create New Order</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        type="text"
                        placeholder="User Name"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Total Amount"
                        className="border p-2 rounded"
                        required
                    />
                    <select className="border p-2 rounded" required>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
