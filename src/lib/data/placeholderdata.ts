import type { Patient } from "@/lib/schema/patient.schema";
import { validatePatients } from "@/lib/schema/patient.schema";

const rawPatientsData = [
  {
    id: "1",
    name: "María González",
    dni: "12345678",
    date_of_birth: "1945-03-15",
    address: "Av. San Martín 1234",
    city: "Neuquén",
    neighborhood: "Centro",
    phone: "+54 299 123-4567",
    email: "maria.gonzalez@email.com",
    emergency_contact: {
      name: "Juan González",
      phone: "+54 299 765-4321",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-02-01T14:20:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    dni: "23456789",
    date_of_birth: "1952-07-22",
    address: "Calle Belgrano 567",
    city: "Cipolletti",
    neighborhood: "Villa Obrera",
    phone: "+54 299 234-5678",
    email: "carlos.rodriguez@email.com",
    emergency_contact: {
      name: "Ana Rodríguez",
      phone: "+54 299 876-5432",
    },
    createdAt: "2024-02-03T09:15:00Z",
    updatedAt: "2024-02-15T16:45:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Ana López",
    dni: "34567890",
    date_of_birth: "1938-11-08",
    address: "Pasaje Los Álamos 89",
    city: "Neuquén",
    neighborhood: "Sapere",
    phone: "+54 299 345-6789",
    contact_notes: "Prefiere llamadas por la mañana",
    createdAt: "2023-11-20T11:00:00Z",
    updatedAt: "2024-01-10T13:30:00Z",
    status: "inactive",
  },
  {
    id: "4",
    name: "Roberto Martínez",
    dni: "45678901",
    date_of_birth: "1948-05-14",
    address: "Ruta Provincial 7 Km 3",
    city: "Plottier",
    neighborhood: "Los Pinos",
    phone: "+54 299 456-7890",
    email: "rmartinez@email.com",
    emergency_contact: {
      name: "Silvia Martínez",
      phone: "+54 299 987-6543",
    },
    createdAt: "2024-03-10T08:45:00Z",
    status: "active",
  },
  {
    id: "5",
    name: "Elena Fernández",
    dni: "56789012",
    date_of_birth: "1955-09-30",
    address: "Av. Argentina 445",
    city: "Neuquén",
    neighborhood: "Bouquet Roldán",
    phone: "+54 299 567-8901",
    email: "elena.fernandez@email.com",
    createdAt: "2024-04-05T15:20:00Z",
    status: "active",
  },
  {
    id: "6",
    name: "José Herrera",
    dni: "67890123",
    date_of_birth: "1940-12-03",
    address: "Calle Rivadavia 123",
    city: "General Roca",
    neighborhood: "Centro",
    phone: "+54 298 678-9012",
    emergency_contact: {
      name: "María Herrera",
      phone: "+54 298 098-7654",
    },
    createdAt: "2023-12-15T12:10:00Z",
    updatedAt: "2024-01-20T10:15:00Z",
    status: "deceased",
  },
  {
    id: "7",
    name: "Carmen Silva",
    dni: "78901234",
    date_of_birth: "1950-02-18",
    address: "Barrio Industrial, Manzana 15",
    city: "Cipolletti",
    neighborhood: "Industrial",
    phone: "+54 299 789-0123",
    email: "carmen.silva@email.com",
    contact_notes: "Horario de atención: 14:00 a 18:00",
    createdAt: "2024-05-12T14:30:00Z",
    status: "active",
  },
  {
    id: "8",
    name: "Francisco Morales",
    dni: "89012345",
    date_of_birth: "1946-08-25",
    address: "Los Aromos 234",
    city: "Centenario",
    neighborhood: "Los Aromos",
    phone: "+54 299 890-1234",
    emergency_contact: {
      name: "Patricia Morales",
      phone: "+54 299 109-8765",
    },
    createdAt: "2024-01-28T16:00:00Z",
    updatedAt: "2024-03-05T11:45:00Z",
    status: "inactive",
  },
  {
    id: "9",
    name: "Lucía Vega",
    dni: "90123456",
    date_of_birth: "1958-06-12",
    address: "Av. Olascoaga 1567",
    city: "Neuquén",
    neighborhood: "Confluencia",
    phone: "+54 299 901-2345",
    email: "lucia.vega@email.com",
    createdAt: "2024-04-20T09:30:00Z",
    status: "active",
  },
  {
    id: "10",
    name: "Miguel Castro",
    dni: "01234567",
    date_of_birth: "1942-01-07",
    address: "Calle San Juan 890",
    city: "Villa Regina",
    neighborhood: "Norte",
    phone: "+54 298 012-3456",
    contact_notes: "Requiere asistencia para movilidad",
    emergency_contact: {
      name: "Rosa Castro",
      phone: "+54 298 210-9876",
    },
    createdAt: "2023-10-08T13:45:00Z",
    updatedAt: "2024-02-12T15:20:00Z",
    status: "active",
  },
  {
    id: "11",
    name: "Teresa Aguirre",
    dni: "11223344",
    date_of_birth: "1953-04-28",
    address: "Barrio Valentina Norte",
    city: "Neuquén",
    neighborhood: "Valentina Norte",
    phone: "+54 299 112-2334",
    email: "teresa.aguirre@email.com",
    createdAt: "2024-05-25T10:15:00Z",
    status: "active",
  },
  {
    id: "12",
    name: "Raúl Mendoza",
    dni: "55667788",
    date_of_birth: "1949-10-16",
    address: "Ruta 22 Km 15",
    city: "Cipolletti",
    neighborhood: "Colonia Nueva",
    phone: "+54 299 556-6778",
    emergency_contact: {
      name: "Norma Mendoza",
      phone: "+54 299 887-7665",
    },
    createdAt: "2024-03-18T11:50:00Z",
    updatedAt: "2024-04-02T14:10:00Z",
    status: "active",
  },
  {
    id: "13",
    name: "Gloria Ramírez",
    dni: "99887766",
    date_of_birth: "1944-07-09",
    address: "Pasaje Huincul 45",
    city: "Cutral Có",
    neighborhood: "Centro",
    phone: "+54 299 998-8776",
    contact_notes: "Familiar disponible solo fines de semana",
    createdAt: "2023-09-12T08:20:00Z",
    updatedAt: "2024-01-15T12:40:00Z",
    status: "inactive",
  },
  {
    id: "14",
    name: "Alberto Torres",
    dni: "22334455",
    date_of_birth: "1951-12-21",
    address: "Av. Roca 2345",
    city: "General Roca",
    neighborhood: "San Pedro",
    phone: "+54 298 223-3445",
    email: "alberto.torres@email.com",
    emergency_contact: {
      name: "Marta Torres",
      phone: "+54 298 554-4332",
    },
    createdAt: "2024-04-08T15:35:00Z",
    status: "active",
  },
  {
    id: "15",
    name: "Rosa Jiménez",
    dni: "66778899",
    date_of_birth: "1947-03-05",
    address: "Calle Córdoba 678",
    city: "Neuquén",
    neighborhood: "Parque Industrial",
    phone: "+54 299 667-7889",
    email: "rosa.jimenez@email.com",
    createdAt: "2024-05-30T07:25:00Z",
    status: "active",
  },
];

// Exportar datos validados
export const patients: Patient[] = validatePatients(rawPatientsData);

// Función helper para obtener un paciente por ID
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};
