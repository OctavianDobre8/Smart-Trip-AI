export default async function Itinerary({ city }: { city: string }) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return (
      <p className="text-red-500">
        Cheia API pentru Groq lipsește din .env.local
      </p>
    );
  }

  // Acesta este "Prompt-ul" - instrucțiunea pe care i-o dăm AI-ului
  const prompt = `Ești un ghid turistic expert. Creează un itinerariu scurt și atractiv de 3 zile pentru orașul ${city}. Răspunde direct în limba română, folosește liste (bullet points) pentru a fi ușor de citit. Pentru fiecare zi, adaugă un mic titlu (ex: Ziua 1: ...). Nu scrie introduceri sau concluzii inutile, dă-mi doar planul efectiv.`;

  let itineraryData = null;

  try {
    // Facem request-ul HTTP (Metoda POST) către serviciul Cloud
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Am actualizat aici cu noul model suportat
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7, // Nivelul de creativitate al AI-ului
        }),
        cache: "no-store",
      },
    );

    itineraryData = await response.json();
  } catch (error) {
    console.error("Eroare fetch AI:", error);
  }

  // Verificăm dacă avem erori de la API
  if (!itineraryData || itineraryData.error) {
    return (
      <p className="text-red-500">
        Am întâmpinat o problemă la generarea itinerariului.
        {itineraryData?.error?.message &&
          ` Detalii: ${itineraryData.error.message}`}
      </p>
    );
  }

  // Extragem textul generat din răspunsul JSON
  const aiResponseText = itineraryData.choices[0].message.content;

  return (
    <div className="prose max-w-none text-gray-800">
      <div className="whitespace-pre-wrap leading-relaxed">
        {aiResponseText}
      </div>
    </div>
  );
}
