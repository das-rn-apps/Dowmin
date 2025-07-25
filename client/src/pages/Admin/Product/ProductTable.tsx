import { Pencil, Trash2 } from "lucide-react";

interface Props {
    products: any[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    onEdit: (product: any) => void;
    onDelete: (id: string) => void;
}

export default function ProductTable({
    products,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    onEdit,
    onDelete,
}: Props) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentItems = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div className="overflow-x-auto rounded-sm border border-orange-200">
                <table className="min-w-full text-xs text-gray-800">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="px-2 py-1 text-left">Image</th>
                            <th className="px-2 py-1 text-left">ProductId</th>
                            <th className="px-2 py-1 text-left">Name</th>
                            <th className="px-2 py-1 text-left">Description</th>
                            <th className="px-2 py-1 text-left">Price (₹)</th>
                            <th className="px-2 py-1 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((p) => (
                            <tr key={p._id} className="hover:bg-orange-400">
                                <td className="px-2 py-1">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="h-8 w-8 rounded object-cover"
                                    />
                                </td>
                                <td className="px-2 py-1">DN{p.productId}</td>
                                <td className="px-2 py-1">{p.name}</td>
                                <td className="px-2 py-1 truncate max-w-[200px]">{p.description}</td>
                                <td className="px-2 py-1 font-semibold">{p.price}</td>
                                <td className="px-2 py-1 flex gap-2">
                                    <button
                                        onClick={() => onEdit(p)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(p._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-3 gap-1 text-xs">
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}
