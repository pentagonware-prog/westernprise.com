import { getDb } from "@/db";
import { demoRequests } from "@/db/schema";

const clean = (value: unknown, limit = 240) => typeof value === "string" ? value.trim().slice(0, limit) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (clean(body.website)) return Response.json({ ok: true }, { status: 201 });

    const values = {
      firstName: clean(body.firstName, 80), lastName: clean(body.lastName, 80),
      workEmail: clean(body.workEmail, 160).toLowerCase(), phone: clean(body.phone, 60),
      company: clean(body.company, 140), role: clean(body.role, 100),
      companySize: clean(body.companySize, 60), preferredDate: clean(body.preferredDate, 20),
      preferredTime: clean(body.preferredTime, 30), notes: clean(body.notes, 1200),
    };
    if (!values.firstName || !values.lastName || !values.workEmail || !values.phone || !values.company || !values.role || !values.companySize || !values.preferredDate || !values.preferredTime) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) {
      return Response.json({ error: "Enter a valid work email address." }, { status: 400 });
    }
    const db = getDb();
    await db.insert(demoRequests).values(values);
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not save your request. Please try again." }, { status: 500 });
  }
}
