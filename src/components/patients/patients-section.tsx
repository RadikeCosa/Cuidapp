// components/patients/patients-section.tsx
import PatientsViewContainer from "@/components/patients/patients-view-container";
import { PatientsService } from "@/lib/services/patients-service";

export async function PatientsSection() {
  const patients = await PatientsService.getAllPatientsFromSupabase();
  return <PatientsViewContainer patients={patients} />;
}
