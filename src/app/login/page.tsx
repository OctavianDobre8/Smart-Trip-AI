import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            SmartTrip AI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Conectează-te pentru a-ți planifica vacanța
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 border focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Adresa de email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Parolă
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 border focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Parola"
              />
            </div>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded">
              {message}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              formAction={login}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Intră în cont
            </button>
            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Creează cont nou
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
