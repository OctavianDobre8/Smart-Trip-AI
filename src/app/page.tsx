import { Suspense } from "react";
import Weather from "@/components/Weather";
import Itinerary from "@/components/Itinerary";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { city } = await searchParams;

  // Funcție pentru Logout (Server Action)
  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🌍 SmartTrip AI</h1>
          <form action={logout}>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Deconectare
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <form action="/" method="GET" className="flex gap-4">
            <input
              name="city"
              type="text"
              placeholder="Introdu orașul (ex: Paris, Tokyo...)"
              defaultValue={city}
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Planifică Călătoria
            </button>
          </form>
        </div>

        {city && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Componenta pentru Vreme */}
            <div className="md:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-blue-800 border-b border-blue-200 pb-2">
                Starea Vremii
              </h2>
              <Suspense
                fallback={
                  <p className="text-blue-600 animate-pulse">
                    Se descarcă datele meteo...
                  </p>
                }
              >
                <Weather city={city} />
              </Suspense>
            </div>

            {/* Placeholder pentru Itinerariul AI */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Itinerariu AI
              </h2>
              <p className="text-gray-600 italic">
                Generăm planul tău de călătorie...
              </p>
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                  Itinerariu AI
                </h2>
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-3 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <p className="text-blue-600 italic mt-4">
                        Generăm cel mai tare plan de călătorie...
                      </p>
                    </div>
                  }
                >
                  <Itinerary city={city} />
                </Suspense>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
