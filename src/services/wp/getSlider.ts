export async function getSlider() {
  const res = await fetch(`${process.env.WP_API_URL}/api/wp/slider`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch slider");
  return res.json();
}
