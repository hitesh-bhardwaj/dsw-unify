import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const K = "sys_v";

export async function GET() {
  const v = (await redis.get(K)) || false;
  return Response.json({ v });
}

export async function POST(request) {
  const b = await request.json();
  await redis.set(K, b.v);
  return Response.json({ ok: true, v: b.v });
}
