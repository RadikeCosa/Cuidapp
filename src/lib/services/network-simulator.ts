// lib/utils/network-simulator.ts

/**
 * Utilidad para simular comportamiento de red en desarrollo
 * Responsabilidad única: Simular delays y errores de red
 */
export class NetworkSimulator {
  private static readonly DEFAULT_DELAY = 200;
  private static readonly ERROR_RATE = 0.05; // 5%

  /**
   * Simula delay de red
   */
  static async simulateDelay(ms: number = NetworkSimulator.DEFAULT_DELAY): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Simula posibles errores de red
   */
  static simulateNetworkError(): void {
    if (Math.random() < NetworkSimulator.ERROR_RATE) {
      throw new Error("Error de conexión con el servidor");
    }
  }

  /**
   * Combina delay y posible error (para casos comunes)
   */
  static async simulateNetworkCall(delay?: number): Promise<void> {
    await NetworkSimulator.simulateDelay(delay);
    NetworkSimulator.simulateNetworkError();
  }
}