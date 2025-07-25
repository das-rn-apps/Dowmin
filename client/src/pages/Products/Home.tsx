import { useEffect } from 'react';
import axios from '../../utils/axios';
import ProductCard from '../../components/ProductCard';
import { useProductStore } from '../../store/productStore';



export default function Home() {
    const { products, setProducts } = useProductStore();

    useEffect(() => {
        if (products.length === 0)
            axios.get('/products').then((res) => setProducts(res.data));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">🍔 Fast Food Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
