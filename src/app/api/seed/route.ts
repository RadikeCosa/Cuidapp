import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  // 1. Insertar pacientes y obtener sus IDs
  const { data: patients, error: patientError } = await supabase
    .from("patients")
    .insert([
      {
        name: "Lucía Fernández",
        dni: "34567890",
        date_of_birth: "1948-11-05",
        gender: "female",
        address: "Calle Mitre 890",
        city: "Plottier",
        neighborhood: "Los Álamos",
        phone: "+54 299 345-6789",
        email: "lucia.fernandez@email.com",
        status: "active",
      },
      {
        name: "Jorge Pérez",
        dni: "45678901",
        date_of_birth: "1950-02-18",
        gender: "male",
        address: "Av. Olascoaga 234",
        city: "Neuquén",
        neighborhood: "Santa Genoveva",
        phone: "+54 299 456-7890",
        email: "jorge.perez@email.com",
        status: "active",
      },
    ])
    .select(); // Así obtenés los IDs generados

  if (patientError) {
    return NextResponse.json({ error: patientError.message }, { status: 500 });
  }

  // 2. Insertar contactos de emergencia asociados a cada paciente
  const emergencyContactsToInsert = [
    {
      patient_id: patients?.[0]?.id,
      name: "Martín Fernández",
      phone: "+54 299 987-6543",
    },
    {
      patient_id: patients?.[1]?.id,
      name: "Sofía Pérez",
      phone: "+54 299 876-5432",
    },
  ];

  const { data: emergencyContacts, error: emergencyError } = await supabase
    .from("emergency_contacts")
    .insert(emergencyContactsToInsert)
    .select();

  if (emergencyError) {
    return NextResponse.json(
      { error: emergencyError.message },
      { status: 500 }
    );
  }

  // 3. Insertar notas de contacto para cada paciente
  const contactNotesToInsert = [
    {
      patient_id: patients?.[0]?.id,
      note: "Hija vive cerca y puede asistir rápidamente.",
    },
    {
      patient_id: patients?.[1]?.id,
      note: "Prefiere ser contactado por WhatsApp.",
    },
  ];

  const { data: contactNotes, error: notesError } = await supabase
    .from("contact_notes")
    .insert(contactNotesToInsert)
    .select();

  if (notesError) {
    return NextResponse.json({ error: notesError.message }, { status: 500 });
  }

  return NextResponse.json({
    patients,
    emergencyContacts,
    contactNotes,
    message: "Seed realizado correctamente con todos los datos",
  });
}
