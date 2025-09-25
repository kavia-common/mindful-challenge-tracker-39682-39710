"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile, logout } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    try {
      const p = await getProfile();
      setEmail(p.email || "");
      setName(p.name || "");
      setBio(p.bio || "");
    } catch {
      // not logged in or error
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({ name, bio });
      setMessage("Profile updated");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update";
      setMessage(message);
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    await logout();
    router.replace("/auth/login");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your personal information.
        </p>
      </div>
      <form onSubmit={onSave} className="card-pro p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            disabled
            value={email}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-600"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="A brief description about you"
          />
        </div>
        {message && <div className="text-sm text-gray-700">{message}</div>}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center rounded-md px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
