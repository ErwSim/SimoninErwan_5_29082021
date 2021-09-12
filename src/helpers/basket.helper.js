export class BasketHelper {
  basketStorage = "basket";

  /**
   * Add product in the localStorage and apply or increase the quantity
   *
   * @param {object | string} product - The product object or product _id that has to be added
   * @param number - The number of time the product has to be added
   * @returns {object} - The new value of the basket storage
   */
  add(product, number) {
    const currentBasket = this.get();

    // Support of object or string value of product
    let productIsAlreadyInBasket;
    if (typeof product === "string") {
      productIsAlreadyInBasket = currentBasket.findIndex(
        (productBasket) => productBasket._id === product
      );
    } else {
      productIsAlreadyInBasket = currentBasket.findIndex(
        (productBasket) => productBasket._id === product._id
      );
    }

    if (productIsAlreadyInBasket !== -1) {
      currentBasket[productIsAlreadyInBasket].quantity += +number;

      if (currentBasket[productIsAlreadyInBasket].quantity < 1) {
        currentBasket.splice(productIsAlreadyInBasket, 1);
      }
    } else {
      product.quantity = +number;
      currentBasket.push(product);
    }

    return this.set(currentBasket);
  }

  /**
   * Get the current value of the localStorage
   *
   * @returns {object} - The current value of the basket storage
   */
  get() {
    return JSON.parse(localStorage.getItem(this.basketStorage)) ?? [];
  }

  /**
   * Push the new value in the localStorage
   *
   * @param {object} - Object to be added in the localStorage
   * @returns {object} - The new value of the basket storage
   */
  set(value) {
    localStorage.setItem(this.basketStorage, JSON.stringify(value));
    this.updateBasketQuantity();

    return this.get();
  }

  /**
   * Update the basket quantity in dom
   */
  updateBasketQuantity() {
    const qbEl = document.getElementById("quantity-in-basket");
    const quantity =
      this.get().reduce((prev, cur) => prev + cur.quantity, 0) ?? 0;

    qbEl.innerText = quantity;

    if (quantity === 0) {
      qbEl.classList.add("invisible");
      qbEl.classList.remove("visible");
    } else {
      qbEl.classList.add("visible");
      qbEl.classList.remove("invisible");
    }
  }
}
