import { checkUrl } from "../decorators";
import { HtmlParser, NumberHelper } from "../helpers";
import { CameraService } from "../services";
import basketHtml from "../templates/basket/basket.template.html";
import basketItemHtml from "../templates/basket/basket-item.template.html";
import { BasketHelper } from "../helpers/basket.helper";

export class BasketComponent {
  basketHelper = new BasketHelper();
  cameraService = new CameraService();
  elBasket = document.getElementById("basket");

  constructor() {
    this.addBasket();
    this.updateBasket();
    this.setBasketTotalPrice();
  }

  /**
   * Add product in the dom
   */
  @checkUrl(["/basket.html"])
  addBasket() {
    const basketItems = this.addBasketItems();

    this.elBasket.innerHTML = HtmlParser(basketHtml, {
      basketItems: basketItems,
    });
  }

  /**
   * Prepare basket items for basket dom
   * @returns {string} Basket items in html
   */
  addBasketItems() {
    let itemHtml = "";
    for (const item of this.basketHelper.get()) {
      item.totalPrice = this.calculateProductTotalPrice(item);
      item.price = NumberHelper.priceOf(item.price);
      itemHtml += HtmlParser(basketItemHtml, item);
    }

    return itemHtml;
  }

  /**
   * Calculate product total price based on quantity
   * @param {object} product - The product
   * @returns {string} The total price of the product
   */
  calculateProductTotalPrice(product) {
    return NumberHelper.priceOf(product.quantity * product.price);
  }

  /**
   * Update basket total price directly in the dom
   */
  setBasketTotalPrice() {
    const basket = new BasketHelper().get();
    let totalPrice = 0;

    basket.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    document.getElementById("basket-total-price").innerText =
      NumberHelper.priceOf(totalPrice);
  }

  updateBasket() {
    document.querySelectorAll("i[data-basket-plus]").forEach((el) => {
      el.addEventListener("click", () => {
        const basket = new BasketHelper().add(
          el.getAttribute("data-basket-plus"),
          1
        );
        const item = basket.find(
          (product) => product._id === el.getAttribute("data-basket-plus")
        );

        document.querySelector(
          `span[data-basket-quantity='${item._id}']`
        ).innerText = item.quantity;
        document.querySelector(
          `span[data-basket-total-price='${item._id}']`
        ).innerText = this.calculateProductTotalPrice(item);

        this.setBasketTotalPrice();
      });
    });

    document.querySelectorAll("i[data-basket-minus]").forEach((el) => {
      el.addEventListener("click", () => {
        const itemId = el.getAttribute("data-basket-minus");
        const basket = new BasketHelper().add(itemId, -1);
        const item = basket.find((product) => product._id === itemId);

        // If the item still exists we update dom
        // Otherwise we delete the item of the dom
        if (item) {
          document.querySelector(
            `span[data-basket-quantity='${itemId}']`
          ).innerText = item.quantity;
          document.querySelector(
            `span[data-basket-total-price='${itemId}']`
          ).innerText = this.calculateProductTotalPrice(item);
        } else {
          document.querySelector(`[data-basket-id='${itemId}']`).remove();
        }

        this.setBasketTotalPrice();
      });
    });
  }
}
