import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { getId } from "@/lib/get-id";
import { user } from "./auth.schema";
import { facility } from "./facility.schema";
import { patient } from "./patient.schema";
import { vaccine } from "./vaccine.schema";

export const appointment = pgTable("appointment", {
  id: text("id").primaryKey().default(getId()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  status: varchar("status").notNull(),
  regNo: varchar("reg_no").notNull(),

  vaccine: varchar("vaccine_id")
    .notNull()
    .references(() => vaccine.id),
  // vaccinator: varchar("vaccinator")
  //   .notNull()
  //   .references(() => user.id),
  patient: varchar("patient_id")
    .notNull()
    .references(() => patient.id),

  // Address Information
  facility: text("facility").references(() => facility.id), // e.g., "City Hospital", "Downtown Clinic"
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: varchar("zip").notNull(),
  country: text("country").notNull().default("Bangladesh"),
});
