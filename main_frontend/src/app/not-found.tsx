import React from "react";

export default function NotFound() {
  return (
    <div className="card-pro p-8" role="alert" aria-live="assertive">
      <h1 className="text-xl font-semibold text-gray-900">404 – Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
    </div>
  );
}
