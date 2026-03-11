import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const API_TOKEN = "Key:94c5ec73ec446f3076b452a6086462440a597a7a8019029ca8575f4ce3177650";

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST" || new URL(req.url).pathname !== "/public") {
    return new Response("Not Found", { status: 404 });
  }

  const auth = req.headers.get("authorization");

  if (!auth || auth !== `Bearer ${API_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  if (!body.post_link) {
    return new Response("Post link required", { status: 400 });
  }

  return new Response(
    JSON.stringify({
      status: "success",
      message: "Reactions sent",
      post: body.post_link,
      reacts: body.reacts || "default",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});
