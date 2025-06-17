import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  // 1. Insertar pacientes y obtener sus IDs
  const { data: patients, error: patientError } = await supabase
    .from("patients")
    .insert([
      {
        name: "María González",
        dni: "12345678",
        date_of_birth: "1945-03-15",
        address: "Av. San Martín 1234",
        city: "Neuquén",
        neighborhood: "Centro",
        phone: "+54 299 123-4567",
        email: "maria.gonzalez@email.com",
        status: "active",
      },
      {
        name: "Carlos Rodríguez",
        dni: "23456789",
        date_of_birth: "1952-07-22",
        address: "Calle Belgrano 567",
        city: "Cipolletti",
        neighborhood: "Villa Obrera",
        phone: "+54 299 234-5678",
        email: "carlos.rodriguez@email.com",
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
      name: "Juan González",
      phone: "+54 299 765-4321",
    },
    {
      patient_id: patients?.[1]?.id,
      name: "Ana Rodríguez",
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
      note: "Prefiere llamadas por la mañana",
    },
    {
      patient_id: patients?.[1]?.id,
      note: "Familiar disponible solo fines de semana",
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
