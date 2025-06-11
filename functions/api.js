export async function onRequest(context) {
  const { request, env } = context;

  const kv = env.WINE_TRACKER_KV;

  // مثلا GET /api?key=somekey
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (request.method === "GET" && key) {
    const value = await kv.get(key);
    return new Response(value || "Not Found", { status: value ? 200 : 404 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
