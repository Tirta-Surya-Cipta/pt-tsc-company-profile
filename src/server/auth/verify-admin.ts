import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface DecodedAdmin {
  id: string;
  email: string;
  role: string;
}

/**
 * Memverifikasi integritas dan masa berlaku JWT token,
 * serta memastikan role pengguna adalah "admin".
 * Digunakan untuk Server Actions dan API Routes (Node.js runtime).
 * 
 * @returns DecodedAdmin jika berhasil, atau melempar Error jika gagal.
 */
export async function verifyAdmin(): Promise<DecodedAdmin> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    const error = new Error("Internal Server Error: AUTH_SECRET missing");
    error.name = "ConfigurationError";
    throw error;
  }

  try {
    const decoded = jwt.verify(token, secret) as DecodedAdmin;
    
    // Role validation
    if (decoded.role !== "admin") {
      const error = new Error("Forbidden: Invalid Role");
      error.name = "ForbiddenError";
      throw error;
    }

    return decoded;
  } catch (error: any) {
    // Tangkap error spesifik dari jsonwebtoken (TokenExpiredError, JsonWebTokenError)
    if (error.name === "TokenExpiredError") {
      const e = new Error("Unauthorized: Token Expired");
      e.name = "UnauthorizedError";
      throw e;
    }
    
    const e = new Error("Unauthorized: Invalid Token");
    e.name = "UnauthorizedError";
    throw e;
  }
}
