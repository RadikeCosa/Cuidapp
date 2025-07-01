import type { Patient } from "@/lib/schema/patient.schema";
import PatientInfoCardHeader from "./info-card-header";
import EmergencyContact from "./info-card-emergency-contact";
import ContactNotes from "./info-card-contact-notes";

interface PatientInfoCardProps {
  patient: Patient;
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <section aria-label={`Ficha de paciente: ${patient.name}`} role="region">
      <PatientInfoCardHeader patient={patient} />

      <div className="p-6">
        <dl className="grid grid-cols-1 gap-y-4">
          <EmergencyContact emergencyContact={patient.emergency_contact} />
          <ContactNotes
            contactNotes={patient.contact_notes}
            patientId={patient.id}
          />
        </dl>
      </div>
    </section>
  );
}
