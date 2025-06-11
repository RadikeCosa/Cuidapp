// src/app/(dashboard)/patients/[id]/loading.tsx - VERSIÓN MEJORADA
import { SkeletonPatientDetailPage } from "@/components/ui/skeletons/patient-detail-patterns";

/**
 * Loading page optimizado para la vista de detalle del paciente
 * - Replica exactamente la estructura de PatientInfoCard
 * - Mantiene las proporciones y espaciado real
 * - Un solo componente, máxima simplicidad
 */
export default function PatientDetailLoading() {
  return <SkeletonPatientDetailPage />;
}
