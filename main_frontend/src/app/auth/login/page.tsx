import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back. Enter your credentials to continue.
        </p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
