import { checkUrl } from "../decorators";
import { HtmlParser } from "../helpers";
import { RouteHelper } from "../helpers/route.helper";
import { CameraService } from "../services";
import productHtml from "../templates/product/product.template.html";
import lenseOptionHtml from "../templates/product/lense-option.template.html";
import successHtml from "../templates/product/success.template.html";
import { BasketHelper } from "../helpers/basket.helper";

export class ProductComponent {
  cameraService = new CameraService();
  elProduct = document.getElementById("product");
  id;
  product;

  constructor() {
    this.retrieveProductId();
    this.getProduct();
  }

  /**
   * Get the product id with the query param id
   */
  @checkUrl(["/product.html"])
  retrieveProductId() {
    this.id = RouteHelper.getQueryParams().get("id");
  }

  /**
   * Get the selected product
   */
  @checkUrl(["/product.html"])
  async getProduct() {
    try {
      this.product = await this.cameraService.getOne(this.id);

      this.addProduct();
    } catch (e) {
      console.trace(`Cannot retrieve the product with error ${e}`);
    }
  }

  /**
   * Add product in the dom
   */
  @checkUrl(["/product.html"])
  addProduct() {
    const lenseOptions = this.addLenseOptions();
    const product = { ...this.product, lenseOptions: lenseOptions };

    this.elProduct.innerHTML = HtmlParser(productHtml, product);
    this.onSubmit();
  }

  /**
   * Prepare lense options for product dom
   * @returns {string} Options list in html
   */
  addLenseOptions() {
    let lenseHtml = "";
    for (const [key, value] of Object.entries(this.product.lenses)) {
      lenseHtml += HtmlParser(lenseOptionHtml, {
        lenseId: key,
        lenseName: value,
      });
    }

    return lenseHtml;
  }

  onSubmit() {
    const form = document.getElementById("form-add-card");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const quantity = event.target.quantity.value;
      const lense = event.target.lense.value; // Will not be used as intended

      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        new BasketHelper().add(this.product, quantity);

        document.getElementById("alerts").innerHTML = successHtml;

        setTimeout(() => {
          document.getElementById("alerts").innerHTML = "";
        }, 5000);
      }

      form.classList.add("was-validated");
    });
  }
}
