import { useState } from 'react';
import { CheckCircle, Star } from 'lucide-react';
import axios from '../../utils/axios';

interface Props {
    onSuccess: () => void;
}

export default function FeedbackForm({ onSuccess }: Props) {
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState<number>(5);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/feedback', { message, rating });
            setSuccess(true);
            setMessage('');
            setRating(5);
            onSuccess();
        } catch {
            alert('Error submitting feedback');
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 md:col-span-1">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">💬 Leave Feedback</h1>

            {success && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-md border border-green-200 mb-5">
                    <CheckCircle size={20} /> Thank you for your feedback!
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={4}
                        placeholder="Tell us what you think..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex items-center gap-3">
                        {[1, 2, 3, 4, 5].map((r) => (
                            <button
                                type="button"
                                key={r}
                                onClick={() => setRating(r)}
                                className={`p-1 ${r <= rating ? 'text-yellow-400' : 'text-gray-300'} transition`}
                            >
                                <Star fill={r <= rating ? 'currentColor' : 'none'} />
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md shadow transition"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}
