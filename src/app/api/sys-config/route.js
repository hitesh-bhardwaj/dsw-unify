let _cfg = { v: false };

export async function GET() {
  return Response.json({ v: _cfg.v });
}

export async function POST(request) {
  const b = await request.json();
  _cfg.v = b.v;
  return Response.json({ ok: true, v: _cfg.v });
}
