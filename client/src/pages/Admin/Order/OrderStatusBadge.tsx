interface Props {
    status: 'Pending' | 'Processing' | 'Completed' | string;
}

export default function OrderStatusBadge({ status }: Props) {
    const color =
        status === 'Completed'
            ? 'bg-green-200 text-green-800'
            : status === 'Processing'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-red-200 text-red-800';

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
            {status}
        </span>
    );
}
