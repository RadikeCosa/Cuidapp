// lib/services/patients-stats-service.ts
import { Patient } from "@/lib/schema/patient.schema";
import { PatientsService } from "./patients-service";
import {
  StatusAnalyzer,
  GeographicAnalyzer,
  DemographicAnalyzer,
  TemporalAnalyzer,
} from "@/lib/analyzers/patient-analyzers";

/**
 * Servicio especializado en estadísticas de pacientes
 * Responsabilidad única: Orquestar la obtención de datos + análisis
 */
export class PatientsStatsService {
  /**
   * Método utilitario para evitar duplicación de lógica de obtención de datos
   * Principio DRY aplicado
   */
  private static async ensurePatientData(
    patients?: Patient[]
  ): Promise<Patient[]> {
    return patients || (await PatientsService.getAllPatients());
  }

  /**
   * Método utilitario genérico para ejecutar cualquier analyzer
   * Elimina la duplicación en todos los métodos públicos
   */
  private static async executeAnalysis<T>(
    analyzer: (patients: Patient[]) => T,
    patients?: Patient[]
  ): Promise<T> {
    const patientsData = await this.ensurePatientData(patients);
    return analyzer(patientsData);
  }

  /**
   * Procesa múltiples estadísticas de una sola vez
   * Evita múltiples llamadas de red para los mismos datos
   */
  static async getAllStats(patients?: Patient[]) {
    const patientsData = await this.ensurePatientData(patients);

    return {
      basic: this.calculateBasicStats(patientsData),
      status: StatusAnalyzer.analyzeDistribution(patientsData),
      geographic: GeographicAnalyzer.analyzeDistribution(patientsData),
      demographic: DemographicAnalyzer.analyzeDemographics(patientsData),
      temporal: TemporalAnalyzer.analyzeTrends(patientsData),
    };
  }

  /**
   * Calcula estadísticas básicas a partir de análisis de status
   */
  private static calculateBasicStats(patients: Patient[]) {
    const statusAnalysis = StatusAnalyzer.analyzeDistribution(patients);
    return {
      total: statusAnalysis.total,
      active: statusAnalysis.counts.active,
      inactive: statusAnalysis.counts.inactive,
      deceased: statusAnalysis.counts.deceased,
    };
  }

  // ✨ Todos estos métodos ahora usan el patrón DRY
  static async getPatientsStats(patients?: Patient[]) {
    return this.executeAnalysis(this.calculateBasicStats.bind(this), patients);
  }

  static async getStatusDistribution(patients?: Patient[]) {
    return this.executeAnalysis(StatusAnalyzer.analyzeDistribution, patients);
  }

  static async getGeographicDistribution(patients?: Patient[]) {
    return this.executeAnalysis(
      GeographicAnalyzer.analyzeDistribution,
      patients
    );
  }

  static async getDemographicStats(patients?: Patient[]) {
    return this.executeAnalysis(
      DemographicAnalyzer.analyzeDemographics,
      patients
    );
  }

  static async getTemporalTrends(patients?: Patient[]) {
    return this.executeAnalysis(TemporalAnalyzer.analyzeTrends, patients);
  }
}
