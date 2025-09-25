"use client";

import { useEffect, useState } from "react";
import PainForm from "@/components/PainForm";
import { listPain, type PainEntry } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [items, setItems] = useState<PainEntry[]>([]);
  const [avg, setAvg] = useState<number>(0);

  async function load() {
    try {
      const data = await listPain();
      setItems(data.slice(0, 5));
      if (data.length) {
        setAvg(+((data.reduce((a, b) => a + (b.intensity || 0), 0) / data.length).toFixed(1)));
      } else {
        setAvg(0);
      }
    } catch {
      setItems([]);
      setAvg(0);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Average Intensity</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{avg}</div>
        </div>
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Recent Entries</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{items.length}</div>
        </div>
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Actions</div>
          <div className="mt-2">
            <Link href="/history" className="text-blue-700 hover:underline">
              View full history →
            </Link>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Log a new entry</h2>
        <PainForm onCreated={() => load()} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Recent</h2>
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-gray-500">No entries yet.</div>
          ) : (
            items.map((p) => (
              <div key={`${p.id}-${p.occurredAt}`} className="card-pro p-4">
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
                {p.description && <p className="mt-2 text-sm text-gray-700">{p.description}</p>}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
