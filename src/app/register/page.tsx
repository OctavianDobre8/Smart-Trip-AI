import { signup } from "../login/actions";
import Link from "next/link";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg mb-4">
            🚀
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Creează cont nou
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Alătură-te și planifică-ți următoarea aventură
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresă Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                placeholder="nume@exemplu.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Parolă (minim 6 caractere)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <p className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {message}
            </p>
          )}

          <button
            formAction={signup}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
          >
            Creează Contul
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Ai deja un cont?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Loghează-te aici
          </Link>
        </p>
      </div>
    </div>
  );
}
