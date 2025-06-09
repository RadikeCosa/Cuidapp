// src/lib/data/placeholderdata.ts
import type { Patient } from "@/lib/schema/patient.schema";
import { validatePatients } from "@/lib/schema/patient.schema";

const rawPatientsData = [
  {
    id: "1",
    name: "María Elena Rodríguez",
    dni: "12345678",
    date_of_birth: "1985-03-15",
    address: "Av. San Martín 1234, Neuquén Capital",
    phone: "+54 299 456-7890",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Carlos Gutiérrez",
    dni: "23456789",
    date_of_birth: "1990-07-22",
    address: "Av. Olascoaga 567, Neuquén Capital",
    phone: "+54 299 567-8901",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-02-10T14:20:00Z",
  },
  {
    id: "3",
    name: "Lucía Mendoza",
    dni: "34567890",
    date_of_birth: "1978-11-05",
    address: "Av. Roca 1200, Cipolletti",
    phone: "+54 299 678-9012",
    status: "inactive",
    image_url: "/placeholder.jpg",
    createdAt: "2024-03-05T09:15:00Z",
  },
  {
    id: "4",
    name: "Roberto Sosa",
    dni: "45678901",
    date_of_birth: "1982-09-18",
    address: "Ruta 22 Km 12, Plottier",
    phone: "+54 299 789-0123",
    status: "deceased",
    image_url: "/placeholder.jpg",
    createdAt: "2024-04-18T16:40:00Z",
  },
  {
    id: "5",
    name: "Valeria Torres",
    dni: "56789012",
    date_of_birth: "1995-02-28",
    address: "Av. del Trabajador 345, Centenario",
    phone: "+54 299 890-1234",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-05-22T11:05:00Z",
  },
  {
    id: "6",
    name: "Fernando Lagos",
    dni: "67890123",
    date_of_birth: "1988-12-10",
    address: "Calle Leloir 789, Neuquén Capital",
    phone: "+54 299 901-2345",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-06-30T08:45:00Z",
  },
  {
    id: "7",
    name: "Carolina Ruiz",
    dni: "78901234",
    date_of_birth: "1975-06-25",
    address: "Av. Argentina 2100, Cipolletti",
    phone: "+54 299 012-3456",
    status: "inactive",
    image_url: "/placeholder.jpg",
    createdAt: "2024-07-12T13:20:00Z",
  },
  {
    id: "8",
    name: "Miguel Ángel Castro",
    dni: "89012345",
    date_of_birth: "1992-04-08",
    address: "Ruta 151 Km 5, Plottier",
    phone: "+54 299 123-4567",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-08-25T17:30:00Z",
  },
  {
    id: "9",
    name: "Daniela Morales",
    dni: "90123456",
    date_of_birth: "1980-01-14",
    address: "Calle Los Alerces 456, Centenario",
    phone: "+54 299 234-5678",
    status: "active",
    image_url: "/placeholder.jpg",
    createdAt: "2024-09-03T10:10:00Z",
  },
  {
    id: "10",
    name: "Oscar Benítez",
    dni: "01234567",
    date_of_birth: "1970-08-30",
    address: "Av. O'Higgins 789, Neuquén Capital",
    phone: "+54 299 345-6789",
    status: "deceased",
    image_url: "/placeholder.jpg",
    createdAt: "2024-10-19T15:25:00Z",
  },
];

// Exportar datos validados
export const patients: Patient[] = validatePatients(rawPatientsData);

// Función helper para obtener un paciente por ID
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
