import FeedbackCard from './FeedbackCard';

interface Feedback {
    _id: string;
    message: string;
    rating: number;
    createdAt: string;
}

interface Props {
    feedbacks: Feedback[];
}

export default function FeedbackList({ feedbacks }: Props) {
    return (
        <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">📝 User Feedbacks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feedbacks.length === 0 ? (
                    <p className="text-gray-500">No feedbacks yet. Be the first!</p>
                ) : (
                    feedbacks.map((fb) => (
                        <FeedbackCard
                            key={fb._id}
                            message={fb.message}
                            rating={fb.rating}
                            createdAt={fb.createdAt}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
