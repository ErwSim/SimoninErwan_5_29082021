export class BasketHelper {
  basketStorage = "basket";

  /**
   * Add products in the localStorage as many time as requested
   *
   * @param product - The product that has to be added
   * @param number - The number of time the product has to be added
   */
  add(product, number) {
    const currentBasket = this.get();

    let newBasket = [];
    for (let i = 0; i < number; i++) {
      newBasket.push(product);
    }

    if (currentBasket !== null) {
      this.set([...currentBasket, ...newBasket]);
    } else {
      this.set(newBasket);
    }
  }

  /**
   * Get the current value of the localStorage
   *
   * @returns {object} - The current value of the basket storage
   */
  get() {
    return JSON.parse(localStorage.getItem(this.basketStorage));
  }

  /**
   * Push the new value in the localStorage
   *
   * @param {object} - Object to be added in the localStorage
   */
  set(value) {
    localStorage.setItem(this.basketStorage, JSON.stringify(value));
  }
}
