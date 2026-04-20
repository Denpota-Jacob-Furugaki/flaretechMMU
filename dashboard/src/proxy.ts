import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REALM = "Flaretech Dashboard";

// Applied to every response (401, 500, pass-through).
const SECURITY_HEADERS: Record<string, string> = {
  // Force HTTPS for 2 years on this hostname and all subdomains.
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  // Block iframe embedding (clickjacking defense).
  "X-Frame-Options": "DENY",
  // Disable MIME-type sniffing.
  "X-Content-Type-Options": "nosniff",
  // Send origin only on cross-origin navigation, no referrer on HTTPS→HTTP.
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Deny sensitive browser APIs we never use.
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
};

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }
  return response;
}

function unauthorized(): NextResponse {
  return withSecurityHeaders(
    new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      },
    }),
  );
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
    return withSecurityHeaders(
      new NextResponse("DASH_USER and DASH_PASS env vars must be set.", {
        status: 500,
      }),
    );
  }

  const creds = decodeBasic(request.headers.get("authorization"));
  if (!creds) return unauthorized();

  const [user, pass] = creds;
  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
