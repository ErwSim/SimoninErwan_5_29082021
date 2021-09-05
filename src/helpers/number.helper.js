export class NumberHelper {
  static priceOf(number) {
    const price = number / 100;
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  }
}
