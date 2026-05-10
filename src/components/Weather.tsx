export default async function Weather({ city }: { city: string }) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ro`;

  let weatherData = null;

  try {
    const response = await fetch(url, { cache: "no-store" });
    weatherData = await response.json();
  } catch (error) {
    // Prindem doar eroarea de rețea aici
    console.error("Eroare fetch meteo:", error);
  }

  // Verificăm datele în afara blocului try-catch
  if (!weatherData) {
    return (
      <p className="text-red-500">Eroare la conectarea cu serverul meteo.</p>
    );
  }

  if (weatherData.cod !== 200) {
    return (
      <p className="text-red-500">Nu am putut găsi vremea pentru acest oraș.</p>
    );
  }

  // Extragem datele de care avem nevoie
  const temp = Math.round(weatherData.main.temp);
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
        className="w-24 h-24 drop-shadow-md"
      />
      <p className="text-4xl font-extrabold text-blue-900">{temp}°C</p>
      <p className="text-lg text-blue-700 capitalize mt-2 font-medium">
        {description}
      </p>
      <div className="mt-4 flex gap-4 text-sm text-blue-600 bg-white/50 p-2 rounded-lg w-full justify-around">
        <span>💨 Vânt: {weatherData.wind.speed} m/s</span>
        <span>💧 Umiditate: {weatherData.main.humidity}%</span>
      </div>
    </div>
  );
}
