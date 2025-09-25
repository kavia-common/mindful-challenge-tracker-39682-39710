"use client";

import { useEffect, useState } from "react";
import { deletePain, listPain, type PainEntry } from "@/lib/api";

export default function PainList() {
  const [items, setItems] = useState<PainEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listPain();
      setItems(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id?: string) {
    if (!id) return;
    try {
      await deletePain(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // ignore
    }
  }

  if (loading) return <div className="text-gray-500">Loading history...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (items.length === 0) return <div className="text-gray-500">No entries yet.</div>;

  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={`${p.id}-${p.occurredAt}`} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-semibold">
                {p.intensity}
              </span>
              <div>
                <div className="font-medium text-gray-900">{p.location}</div>
                <div className="text-xs text-gray-500">
                  {p.occurredAt ? new Date(p.occurredAt).toLocaleString() : ""}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(p.id)}
              className="text-red-600 hover:text-red-700 text-sm"
              aria-label="Delete entry"
              title="Delete entry"
            >
              Delete
            </button>
          </div>
          {p.description && (
            <p className="mt-2 text-sm text-gray-700">{p.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
