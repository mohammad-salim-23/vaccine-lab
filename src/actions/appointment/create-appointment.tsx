"use server";

import { AUTH_CALLBACK_URL } from "@/config";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { appointment, patient } from "../../../db/schema";
import { getId } from "@/lib/get-id";

type CreateAppointmentProps = {
    name: string;
    dob: string;
    gender: string;
    fathersName: string;
    mothersName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    vaccinationType: string;
    nationalId: string;
};

export async function createAppointment(data: CreateAppointmentProps) {
    const idLength = data.nationalId.length;
    const patientId = getId();
    const appointmentId = getId();
    try {
        const res = await db.transaction(async (tx) => {
            const patientResult = await tx.insert(patient).values({
                id: patientId,
                name: data.name,
                dob: new Date(data.dob),
                gender: data.gender,
                fatherName: data.fathersName,
                motherName: data.mothersName,
                email: data.email,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.state,
                zip: data.zip,
                country: data.country,
                nationalId: idLength === 10 ? data.nationalId : null,
                birthCertificateId: idLength !== 10 ? data.nationalId : null,
            }).returning({ id: patient.id });

            await tx.insert(appointment).values({
                id: appointmentId,
                status: 'pending',
                regNo: `REG-${Date.now()}`,
                vaccine: data.vaccinationType,
                patient: patientResult[0].id,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.state,
                zip: data.zip,
                country: data.country,
            });
        });

        return {
            error: null,
            success: true,
        };
    } catch (error) {
        console.error("Create appointment error:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to create appointment",
            success: false,
        };
    }
}
