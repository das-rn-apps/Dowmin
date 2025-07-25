import { Star } from 'lucide-react';

interface Props {
    message: string;
    rating: number;
    createdAt: string;
}

export default function FeedbackCard({ message, rating, createdAt }: Props) {
    return (
        <div className="border border-gray-100 rounded-sm p-2 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
                <div className="flex gap-1 text-yellow-400">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
                <span className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="text-sm text-gray-700">{message}</p>
        </div>
    );
}
