export default function UploadLoader() {
    return (
        <div className="flex items-center justify-center mt-2">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-2 text-sm text-gray-600">Uploading...</span>
        </div>
    );
}
