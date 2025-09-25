import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="card-pro p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
        <p className="mt-2 text-gray-600">
          Track discomforts mindfully to grow. Please sign in or create an account to continue.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center rounded-md px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
          >
            Create account
          </Link>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Theme</div>
          <div className="text-gray-900">Ocean Professional</div>
        </div>
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Primary</div>
          <div className="text-gray-900">#2563EB</div>
        </div>
        <div className="card-pro p-6">
          <div className="text-sm text-gray-500">Accent</div>
          <div className="text-gray-900">#F59E0B</div>
        </div>
      </section>
    </div>
  );
}
