/**
 * @description Error Class desicated to Golgua
 */
export class GolguaError extends Error {
  /**
   * @param {String} message error message
   */
  constructor(message) {
    super();
    this.message = message;
  }
}
