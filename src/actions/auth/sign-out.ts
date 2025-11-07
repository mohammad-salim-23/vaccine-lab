"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signOut() {
  try {
    const data = await auth.api.signOut({
      headers: await headers(),
    });

    if (!data?.success) {
      return {
        error: "Failed to sign out",
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to sign out",
      success: false,
    };
  }
}
