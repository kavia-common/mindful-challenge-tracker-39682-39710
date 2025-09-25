"use client";

import { useState } from "react";
import { createPain, type PainEntry } from "@/lib/api";

export default function PainForm({ onCreated }: { onCreated?: (p: PainEntry) => void }) {
  const [intensity, setIntensity] = useState(5);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occurredAt, setOccurredAt] = useState<string>(() => new Date().toISOString().slice(0, 16));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const created = await createPain({
        intensity,
        location,
        description,
        occurredAt: new Date(occurredAt).toISOString(),
      });
      onCreated?.(created);
      setLocation("");
      setDescription("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create entry";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Intensity (1-10)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value || "1", 10))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="e.g., lower back, head"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Occurred At</label>
          <input
            type="datetime-local"
            value={occurredAt}
            onChange={(e) => setOccurredAt(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          placeholder="Optional notes, sensations, mindset ..."
        />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded p-2">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition"
        >
          {loading ? "Saving..." : "Log entry"}
        </button>
      </div>
    </form>
  );
}
