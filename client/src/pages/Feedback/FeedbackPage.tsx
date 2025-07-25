import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import FeedbackList from '../../components/feedback/FeedbackList';
import FeedbackForm from '../../components/feedback/FeedbackForm';

interface Feedback {
    _id: string;
    message: string;
    rating: number;
    createdAt: string;
}

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get('/feedback');
            setFeedbacks(res.data);
        } catch {
            alert('Error fetching feedbacks');
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <div className="max-w-full m-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeedbackList feedbacks={feedbacks} />
                <FeedbackForm onSuccess={fetchFeedbacks} />
            </div>
        </div>
    );
}
