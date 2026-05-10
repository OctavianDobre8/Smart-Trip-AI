# SmartTrip AI — Asistent Inteligent pentru Călătorii

| Câmp                 | Detalii                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| **Nume Prenume**     | Dobre Octavian-Ștefan                                                    |
| **Grupa**            | 1146                                                                     |
| **Video prezentare** | <https://youtu.be/m9RjsbK1hYs?si=BCVGSfl9GRYGP-87>                       |
| **Link publicare**   | [smart-trip-ai-seven.vercel.app](https://smart-trip-ai-seven.vercel.app) |

---

## 1. Introducere

**SmartTrip AI** este o aplicație web dezvoltată pentru a eficientiza procesul de planificare a călătoriilor. Utilizând framework-ul **Next.js** și platforma **Supabase** pentru gestionarea utilizatorilor, aplicația permite utilizatorilor autentificați să obțină instantaneu:

- date meteorologice **în timp real** pentru orice destinație
- un **itinerariu turistic generat de inteligență artificială**, personalizat pe orașul ales

---

## 2. Descrierea Problemei

În mod tradițional, planificarea unei vacanțe necesită consultarea mai multor platforme independente:

- **aplicații meteorologice** — pentru verificarea condițiilor climatice
- **bloguri și ghiduri turistice** — pentru stabilirea unui traseu

Această fragmentare a informației consumă timp și îngreunează luarea deciziilor. **SmartTrip AI** rezolvă această problemă prin agregarea datelor esențiale (vreme + planificare) într-o **singură interfață unificată și securizată**.

---

## 3. Descrierea API-urilor Integrate

Aplicația integrează două servicii cloud externe prin intermediul arhitecturii **REST**:

### 3.1 OpenWeatherMap API

Serviciu meteorologic utilizat pentru extragerea datelor curente pe baza numelui orașului introdus de utilizator.

**Date returnate:** temperatură, umiditate, viteză vânt, descriere generală.

### 3.2 Groq Cloud API

Serviciu de inferență AI de mare viteză, utilizând modelul `llama-3.1-8b-instant`. Aplicația trimite un prompt dinamic și primește un itinerariu structurat pe zile pentru destinația selectată.

---

## 4. Flux de Date

Arhitectura aplicației se bazează pe **Server Components** (Next.js) pentru a proteja cheile API și a optimiza performanța.

### Metode HTTP utilizate

| Serviciu       | Metodă | Scop                                    |
| -------------- | ------ | --------------------------------------- |
| OpenWeatherMap | `GET`  | Interogare date meteorologice           |
| Groq Cloud     | `POST` | Trimitere prompt și generare itinerariu |

---

### 4.1 OpenWeatherMap — Request & Response

**Request:**

```http
GET https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=CHEIE_API&lang=ro
```

**Response (JSON):**

```json
{
  "weather": [{ "description": "cer senin", "icon": "01d" }],
  "main": {
    "temp": 22.5,
    "humidity": 45
  },
  "wind": {
    "speed": 3.6
  },
  "cod": 200
}
```

---

### 4.2 Groq Cloud AI — Request & Response

**Request:**

```http
POST https://api.groq.com/openai/v1/chat/completions
Content-Type: application/json
Authorization: Bearer CHEIE_API
```

```json
{
  "model": "llama-3.1-8b-instant",
  "messages": [
    {
      "role": "user",
      "content": "Creează un itinerariu de 3 zile pentru Paris..."
    }
  ]
}
```

**Response (JSON):**

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Ziua 1: Explorarea centrului...\n- Vizită la Turnul Eiffel\n- Plimbare pe Sena..."
      }
    }
  ]
}
```

---

### 4.3 Autentificare și Autorizare

Securitatea aplicației este gestionată prin **Supabase Auth** și funcționează astfel:

1. Utilizatorul se autentifică cu **email și parolă**.
2. La autentificare reușită, Supabase emite un **token de sesiune** stocat automat în cookie-urile browserului.
3. Un fișier **Middleware** la nivel de server interceptează fiecare cerere și verifică validitatea cookie-ului, asigurând **persistența sesiunii la refresh**.
4. Rutele principale sunt **protejate** — accesul la apelurile API externe este permis exclusiv utilizatorilor autorizați.

---

## 5. Capturi de Ecran

### Pagina de Autentificare / Înregistrare

![Pagina de Login](./docs/login.png)

### Dashboard-ul Principal

![Dashboard](./docs/dashboard.png)

## 6. Referințe

| Resursă                      | Link                                                                   |
| ---------------------------- | ---------------------------------------------------------------------- |
| Next.js Documentation        | [nextjs.org/docs](https://nextjs.org/docs)                             |
| Supabase Authentication Docs | [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth) |
| OpenWeatherMap API Reference | [openweathermap.org/api](https://openweathermap.org/api)               |
| Groq API Documentation       | [console.groq.com/docs](https://console.groq.com/docs)                 |
