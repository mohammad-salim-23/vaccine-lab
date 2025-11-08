"use server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { vaccine } from "../../../db/schema";

export async function verifyVaccine({ code }: { code: string }) {
  try {
    const result = await db.select().from(vaccine).where(eq(vaccine.code, code));

    if (!result || result.length === 0) {
      return {
        error: "Vaccine not found",
        user: null,
      };
    }

    return {
      error: null,
      vaccine: result[0],
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to verify vaccine",
      user: null,
    };
  }
}
