import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Success!</h1>
        <p className="text-gray-600 my-2">Your payment was done.</p>
        <Link
          href={"/dashboard"}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
