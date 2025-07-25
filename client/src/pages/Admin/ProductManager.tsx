import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useProductStore } from '../../store/productStore';


export default function ProductManager() {
    const { products, setProducts } = useProductStore();

    const [form, setForm] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
    });

    const fetchProducts = async () => {
        const res = await axios.get('/products');
        setProducts(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/products', form);
        setForm({ name: '', price: 0, description: '', image: '' });
        fetchProducts();
    };

    useEffect(() => {
        if (products.length === 0)
            fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">📦 Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="border p-2"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="border p-2"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
                <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded">
                    Add Product
                </button>
            </form>

            <h2 className="text-xl font-bold mb-2">📋 Product List</h2>
            <div className="grid gap-4">
                {products.map((p) => (
                    <div key={p._id} className="border p-3 rounded shadow-sm">
                        <p className="font-bold">{p.name} - ₹{p.price}</p>
                        <p className="text-sm text-gray-600">{p.description}</p>
                        <img src={p.image} alt={p.name} className="h-20 mt-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
