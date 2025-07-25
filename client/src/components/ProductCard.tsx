import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../store/productStore';

export default function ProductCard({ product }: { product: Product }) {
    const { items, addToCart, removeFromCart, updateQuantity } = useCartStore();
    const cartItem = items.find((item) => item.productId === product._id);

    const handleAdd = () => {
        addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    const handleIncrease = () => {
        if (cartItem) updateQuantity(cartItem.productId, cartItem.quantity + 1);
    };

    const handleDecrease = () => {
        if (cartItem) {
            if (cartItem.quantity <= 1) {
                removeFromCart(cartItem.productId);
            } else {
                updateQuantity(cartItem.productId, cartItem.quantity - 1);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 p-4 flex flex-col">
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover rounded-md mb-4"
            />

            {/* Product Info */}
            <h3 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>

            {/* Price + Action */}
            <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-semibold text-green-600">₹{product.price}</span>

                {!cartItem ? (
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrease}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-md border border-gray-300 transition"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="min-w-[20px] text-center text-sm font-medium">
                            {cartItem.quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-md border border-gray-300 transition"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
