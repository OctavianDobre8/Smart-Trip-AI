export default async function Itinerary({
  city,
  days = "3",
  style = "Cultural",
}: {
  city: string;
  days?: string;
  style?: string;
}) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `Creează un itinerariu de ${days} ${Number(days) === 1 ? "zi" : "zile"} pentru ${city} cu stil ${style}. 
Structurează răspunsul pe zile (Ziua 1, Ziua 2, etc.), cu 3-4 activități per zi relevante pentru stilul ${style}.
Fii concis și practic. Răspunde în română.`,
          },
        ],
      }),
      cache: "no-store",
    },
  );

  const data = await response.json();
  const text =
    data.choices?.[0]?.message?.content ?? "Nu am putut genera itinerariul.";

  return (
    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  );
}
