import { checkUrl } from "../decorators";
import { HtmlParser, NumberHelper } from "../helpers";
import { CameraService } from "../services";
import basketHtml from "../templates/basket/basket.template.html";
import basketItemHtml from "../templates/basket/basket-item.template.html";
import failureHtml from "../templates/basket/failure.template.html";
import { BasketHelper } from "../helpers/basket.helper";

export class BasketComponent {
  basketHelper = new BasketHelper();
  cameraService = new CameraService();
  elBasket = document.getElementById("basket");

  constructor() {
    this.addBasket();
    this.updateBasket();
    this.setBasketTotalPrice();
    this.onSubmit();
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
  @checkUrl(["/basket.html"])
  setBasketTotalPrice() {
    const basket = new BasketHelper().get();
    let totalPrice = 0;

    basket.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    document.getElementById("basket-total-price").innerText =
      NumberHelper.priceOf(totalPrice);
  }

  /**
   * Update basket when the user clicks on minus or plus
   */
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

  /**
   * When the user clicks on the submit button, all products in the basket are ordered
   * after some verifications
   */
  @checkUrl(["/basket.html"])
  onSubmit() {
    const form = document.getElementById("form-order");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const address = event.target.address.value;
      const city = event.target.city.value;
      const email = event.target.email.value;

      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        const basket = new BasketHelper().get();
        const products = [];
        for (const item of basket) {
          for (let i = 0; i < item.quantity; i++) {
            products.push(item._id);
          }
        }

        const order = await this.cameraService.createOrder(
          firstName,
          lastName,
          address,
          city,
          email,
          products
        );

        if (order) {
          sessionStorage.setItem("order", JSON.stringify(order));
          location.href = "/order-confirm.html";
        } else {
          document.getElementById("alerts").innerHTML = failureHtml;
        }
      }

      form.classList.add("was-validated");
    });
  }
}
