import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
        <p className="text-gray-600 text-sm mt-1">
          Start your mindful tracking journey.
        </p>
      </div>
      <AuthForm mode="register" />
    </div>
  );
}
