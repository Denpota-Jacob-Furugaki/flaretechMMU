import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REALM = "Flaretech Dashboard";

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function decodeBasic(header: string | null): [string, string] | null {
  if (!header) return null;
  const [scheme, encoded] = header.split(" ", 2);
  if (scheme?.toLowerCase() !== "basic" || !encoded) return null;
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return [decoded.slice(0, idx), decoded.slice(idx + 1)];
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const expectedUser = process.env.DASH_USER;
  const expectedPass = process.env.DASH_PASS;

  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "DASH_USER and DASH_PASS env vars must be set.",
      { status: 500 },
    );
  }

  const creds = decodeBasic(request.headers.get("authorization"));
  if (!creds) return unauthorized();

  const [user, pass] = creds;
  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
