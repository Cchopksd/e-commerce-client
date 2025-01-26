"use client";
import { useEffect, useState } from "react";
import {
  AlertOctagon,
  Home,
  RefreshCcw,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function ServerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const [isReporting, setIsReporting] = useState(false);

  const handleReportIssue = () => {
    setIsReporting(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-50 p-6 text-center">
          <div className="flex justify-center mb-4">
            <AlertOctagon
              className="text-blue-500"
              size={90}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-5xl font-bold text-blue-600 mb-2">Oops!</h1>
          <p className="text-xl text-gray-700">Something went wrong</p>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center">
            Don't worry, this happens sometimes. We're working to fix it
            quickly.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="flex items-center space-x-2 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition">
              <Home size={20} />
              <span>Go Home</span>
            </a>
            <button
              onClick={() => reset()}
              className="flex items-center space-x-2 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition">
              <RefreshCcw size={20} />
              <span>Retry</span>
            </button>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Mail className="text-yellow-600 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Need Help?
              </h3>
            </div>
            <p className="text-gray-700">
              If the problem persists, please contact our support team at
            </p>
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline font-medium">
              support@example.com
            </a>
          </div>
        </div>

        <div className="text-center pb-6">
          <button
            onClick={handleReportIssue}
            className="text-blue-500 hover:text-blue-600 transition flex items-center justify-center space-x-2 w-full">
            <MessageCircle size={20} />
            <span>Report this issue</span>
          </button>
        </div>
      </div>

      {/* Render Modal if isReporting is true */}
      {isReporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
            <Modal
              onCancel={() => setIsReporting(false)}
              onSubmit={() => {
                setIsReporting(false);
                // Handle submission logic here
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Modal = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Help Us Improve</h2>
      <textarea
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        rows={4}
        placeholder="Describe what you were doing when this error occurred"
      />
      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition">
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Send Report
        </button>
      </div>
    </div>
  );
};
