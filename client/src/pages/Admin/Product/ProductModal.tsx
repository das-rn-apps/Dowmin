import { useState } from 'react';
import axios from '../../../utils/axios';
import UploadLoader from './UploadLoader';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductModal({ isOpen, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: '',
        price: 0,
        description: '',
        imageFile: null as File | null,
        imagePreview: '',
    });

    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', String(form.price));
        formData.append('description', form.description);
        if (form.imageFile) {
            formData.append('image', form.imageFile);
        }

        setIsUploading(true);

        try {
            await axios.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setForm({ name: '', price: 0, description: '', imageFile: null, imagePreview: '' });
            setIsUploading(false);
            onClose();
            onSuccess();
        } catch (err) {
            console.error('Upload failed', err);
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-xl p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">📦 Add New Product</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-2 rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 rounded"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="border p-2 rounded"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-sm border rounded px-2 py-1 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                    />
                    {form.imagePreview && (
                        <img
                            src={form.imagePreview}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded border"
                        />
                    )}
                    {isUploading && <UploadLoader />}
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
