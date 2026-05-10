const STYLE_ICONS: Record<string, string> = {
  Cultural: "🏛️",
  Aventură: "🧗",
  Gastronomic: "🍜",
  Relaxare: "🏖️",
};

function getWeatherEmoji(description: string): string {
  if (description.includes("ploaie") || description.includes("rain"))
    return "🌧️";
  if (description.includes("nori") || description.includes("cloud"))
    return "☁️";
  if (description.includes("senin") || description.includes("clear"))
    return "☀️";
  if (description.includes("ninsoare") || description.includes("snow"))
    return "❄️";
  if (description.includes("ceață") || description.includes("fog")) return "🌫️";
  if (description.includes("furtună") || description.includes("storm"))
    return "⛈️";
  return "🌤️";
}

export default async function Weather({
  city,
  days = "3",
  style = "Cultural",
}: {
  city: string;
  days?: string;
  style?: string;
}) {
  const daysCount = Math.min(Number(days), 5);

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}&lang=ro&cnt=${daysCount * 8}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return (
      <p className="text-sm text-red-300 text-center">
        Orașul nu a fost găsit.
      </p>
    );
  }

  const data = await res.json();

  // Grupăm forecast-ul pe zile (un entry per zi la ora 12:00)
  const dailyMap: Record<
    string,
    { temp: number; description: string; humidity: number; wind: number }
  > = {};

  for (const entry of data.list) {
    const date = new Date(entry.dt * 1000);
    const dateKey = date.toLocaleDateString("ro-RO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const hour = date.getHours();

    // Luăm entry-ul de la ora 12 pentru fiecare zi
    if (!dailyMap[dateKey] || hour === 12) {
      dailyMap[dateKey] = {
        temp: Math.round(entry.main.temp),
        description: entry.weather[0].description,
        humidity: entry.main.humidity,
        wind: Math.round(entry.wind.speed * 3.6), // m/s → km/h
      };
    }
  }

  const dailyEntries = Object.entries(dailyMap).slice(0, daysCount);

  return (
    <div className="space-y-2">
      {/* Stil călătorie */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-blue-200 mb-4">
        <span>{STYLE_ICONS[style] ?? "✈️"}</span>
        <span>{style}</span>
        <span>·</span>
        <span>
          {daysCount} {daysCount === 1 ? "zi" : "zile"}
        </span>
      </div>

      {dailyEntries.map(([dateLabel, w], i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{getWeatherEmoji(w.description)}</span>
            <div>
              <p className="text-xs font-semibold text-white capitalize">
                {dateLabel}
              </p>
              <p className="text-xs text-blue-200 capitalize">
                {w.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{w.temp}°C</p>
            <p className="text-xs text-blue-200">
              {w.humidity}% · {w.wind}km/h
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
