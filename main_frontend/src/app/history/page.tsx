import PainList from "@/components/PainList";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-gray-900">History</h1>
        <p className="text-gray-600 text-sm mt-1">
          Review and manage your recorded entries.
        </p>
      </div>
      <PainList />
    </div>
  );
}
