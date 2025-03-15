import {Loader2} from "lucide-react"

export default function LoadingPage() {
    return (
        <div
            className="min-h-[calc(100vh-48px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="flex flex-col items-center space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-blue-600 dark:text-blue-400"/>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Loading...</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we prepare your content</p>
            </div>
        </div>
    )
}

