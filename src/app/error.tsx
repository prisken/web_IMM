"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
} 