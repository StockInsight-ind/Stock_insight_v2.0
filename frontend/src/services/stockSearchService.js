const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://epmmmdbwlrldxgajpffx.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbW1tZGJ3bHJsZHhnYWpwZmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODEwOTAsImV4cCI6MjA5Nzg1NzA5MH0.5_yDhHiWCUkMZO5xSnzuiBFi3qMNuGZz_LLte_s7U1U";

const marketCodeMap = {
  usa: "USA",
  india: "INDIA",
  australia: "Australia",
  europe: "EUROPE",
  japan: "JAPAN",
};

export async function searchStocks(query, market = "USA") {
  const normalizedQuery = String(query || "").trim();
  const normalizedMarket =
    marketCodeMap[String(market || "").trim().toLowerCase()] ||
    String(market || "").trim().toUpperCase() ||
    "USA";

  if (!normalizedQuery) {
    return [];
  }

  const requestUrl = new URL(`${SUPABASE_URL}/rest/v1/stocks`);
  requestUrl.searchParams.set("select", "symbol,company_name");
  requestUrl.searchParams.set("market", `eq.${normalizedMarket}`);
  requestUrl.searchParams.set(
    "or",
    `(symbol.ilike.${normalizedQuery}*,company_name.ilike.${normalizedQuery}*)`
  );
  requestUrl.searchParams.set("limit", "10");

  const response = await fetch(requestUrl.toString(), {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to search stocks");
  }

  return response.json();
}
