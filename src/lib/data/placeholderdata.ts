// src/lib/data/placeholderdata.ts
import type { Patient } from "@/lib/schema/patient.schema";
import { validatePatients } from "@/lib/schema/patient.schema";

// Datos raw sin validar
const rawPatientsData = [
  {
    id: "1",
    name: "Juan Pérez",
    dni: "12345678",
    date_of_birth: "1985-05-15",
    createdAt: "2025-06-01",
    status: "active",
    image_url: "/placeholder.jpg",
  },
  {
    id: "2",
    name: "Ana Gómez",
    dni: "87654321",
    date_of_birth: "1990-07-20",
    createdAt: "2025-06-02",
    status: "active",
    image_url: "/placeholder.jpg",
  },
  {
    id: "3",
    name: "Carlos López",
    dni: "11223344",
    date_of_birth: "1978-03-10",
    createdAt: "2025-06-03",
    status: "inactive",
    image_url: "/placeholder.jpg",
  },
  {
    id: "4",
    name: "María Rodríguez",
    dni: "55667788",
    date_of_birth: "1982-11-25",
    createdAt: "2025-06-04",
    status: "deceased",
    image_url: "/placeholder.jpg",
  },
  {
    id: "5",
    name: "Luis Fernández",
    dni: "99887766",
    date_of_birth: "1995-01-30",
    createdAt: "2025-06-05",
    status: "active",
    image_url: "/placeholder.jpg",
  },
];

// Exportar datos validados
export const patients: Patient[] = validatePatients(rawPatientsData);

// Función helper para obtener un paciente por ID
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
