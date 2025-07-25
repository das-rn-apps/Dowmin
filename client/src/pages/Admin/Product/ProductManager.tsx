import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import axios from '../../../utils/axios';
import { useProductStore } from '../../../store/productStore';
import ProductModal from './ProductModal';
import ProductTable from './ProductTable';

export default function ProductManager() {
    const { products, setProducts } = useProductStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchProducts = async () => {
        const res = await axios.get('/products');
        setProducts(res.data);
    };

    useEffect(() => {
        if (products.length === 0) fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📋 Product List</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            <ProductTable
                products={products}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onEdit={(product) => {
                    setForm(product);
                    setIsModalOpen(true);
                }}
                onDelete={async (id) => {
                    await axios.delete(`/products/${id}`);
                    fetchProducts();
                }}
            />


            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchProducts}
            />
        </div>
    );
}
