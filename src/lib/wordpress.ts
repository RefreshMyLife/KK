const WP_API_URL = process.env.WP_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function wpGraphQL<T>(query: string, variables: any = {}): Promise<T> {
  const res = await fetch(`${WP_API_URL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

export async function wpRest<T>(endpoint: string): Promise<T> {
  const url = `${WP_API_URL}/wp-json/${endpoint}`;
  console.log("Fetching:", url);
  const res = await fetch(url, { next: { revalidate: 60 } }).catch(e => {
    console.error("Fetch failed:", e);
    throw new Error("Network error");
  });
  console.log("Response status:", res.status);
  if (!res.ok) throw new Error(`WP REST error: ${res.status}`);
  return res.json();
}
