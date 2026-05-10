import { Suspense } from "react";
import Weather from "@/components/Weather";
import Itinerary from "@/components/Itinerary";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; days?: string; style?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { city, days = "3", style = "Cultural" } = await searchParams;

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg">🌍</span>
            <span className="text-lg font-black text-gray-800 tracking-tight">
              SmartTrip<span className="text-blue-500">AI</span>
            </span>
          </div>

          <form
            action="/"
            method="GET"
            className="flex w-full sm:w-auto gap-2 flex-wrap justify-center"
          >
            <input
              name="city"
              type="text"
              placeholder="Destinație..."
              defaultValue={city}
              required
              className="flex-1 sm:w-52 border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <select
              name="days"
              defaultValue={days}
              className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 5].map((d) => (
                <option key={d} value={d}>
                  {d} {d === 1 ? "zi" : "zile"}
                </option>
              ))}
            </select>
            <select
              name="style"
              defaultValue={style}
              className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["Cultural", "Aventură", "Gastronomic", "Relaxare"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all active:scale-95">
              Caută
            </button>
          </form>

          <form action={logout}>
            <button className="text-sm text-gray-400 hover:text-red-500 transition-colors shrink-0">
              Ieșire
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {!city ? (
          <div className="flex flex-col items-center justify-center mt-24 text-center gap-4">
            <span className="text-6xl">✈️</span>
            <h2 className="text-2xl font-bold text-gray-700">
              Unde călătorim?
            </h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Introdu o destinație, numărul de zile și stilul preferat. AI-ul
              generează instant un plan personalizat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Weather — coloana mai îngustă */}
            <div className="lg:col-span-2">
              <div className="bg-blue-600 p-6 rounded-2xl text-white sticky top-20">
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 text-center">
                  {city}
                </h2>
                <Suspense
                  fallback={
                    <div className="space-y-2 animate-pulse">
                      {Array.from({ length: Number(days) }).map((_, i) => (
                        <div key={i} className="h-14 bg-white/10 rounded-xl" />
                      ))}
                    </div>
                  }
                >
                  <Weather city={city} days={days} style={style} />
                </Suspense>
              </div>
            </div>

            {/* Itinerary — coloana mai lată */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                  <span className="text-lg">🤖</span>
                  <div>
                    <h2 className="text-base font-bold text-gray-800">
                      Plan de călătorie
                    </h2>
                    <p className="text-xs text-gray-400">
                      {city} · {days} {Number(days) === 1 ? "zi" : "zile"} ·{" "}
                      {style}
                    </p>
                  </div>
                </div>
                <Suspense
                  fallback={
                    <div className="space-y-3 animate-pulse">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-gray-100 rounded"
                          style={{ width: `${70 + i * 5}%` }}
                        />
                      ))}
                      <p className="text-xs text-blue-400 mt-6">
                        ⏳ Se generează itinerariul...
                      </p>
                    </div>
                  }
                >
                  <Itinerary city={city} days={days} style={style} />
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
