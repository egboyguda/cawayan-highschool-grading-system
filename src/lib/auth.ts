import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type SessionPayload = {
  userId: string;
  expires: Date;
};
const key = new TextEncoder().encode(process.env.SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("Error decrypting session:", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();
  await cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
  console.log("cookie set");
}
