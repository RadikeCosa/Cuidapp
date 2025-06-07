//src/app/(dashboard)/patients/page.tsx

import CardWrapper from "@/components/ui/cardWrapper";
import PatientsTable from "@/components/patients/table";
export default function PatientsPage() {
  return (
    <div className="">
      <div>Modulo Pacientes</div>
      <CardWrapper />
      <PatientsTable />
    </div>
  );
}
