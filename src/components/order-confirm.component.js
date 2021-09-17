import { HtmlParser, NumberHelper } from "../helpers";
import orderConfirmHtml from "../templates/order-confirm/order-confirm.template.html";
import noOrderHtml from "../templates/order-confirm/no-order.template.html";
import { checkUrl } from "../decorators";

export class OrderConfirmComponent {
  elOrder = document.getElementById("order-confirm");
  constructor() {
    this.addConfirmMessage();
  }

  /**
   * Get the order that is confirmed and stored in session storage
   * @returns {object} The order confirmation
   */
  confirmedOrder() {
    return JSON.parse(sessionStorage.getItem("order"));
  }

  /**
   * Delete the stored order
   */
  deleteOrderHistory() {
    sessionStorage.removeItem("order");
  }

  deleteBasket() {
    localStorage.removeItem("basket");
  }

  /**
   * Add the template in the page
   */
  @checkUrl(["/order-confirm.html"])
  addConfirmMessage() {
    const order = this.confirmedOrder();
    if (order) {
      const totalPrice = order.products.reduce(
        (prev, cur) => prev + cur.price,
        0
      );

      this.elOrder.innerHTML = HtmlParser(orderConfirmHtml, {
        orderId: this.confirmedOrder().orderId,
        totalPrice: NumberHelper.priceOf(totalPrice),
      });

      this.deleteOrderHistory();
      this.deleteBasket();
    } else {
      this.elOrder.innerHTML = noOrderHtml;
    }
  }
}
