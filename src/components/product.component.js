import { checkUrl } from "../decorators";
import { HtmlParser } from "../helpers";
import { RouteHelper } from "../helpers/route.helper";
import { CameraService } from "../services";
import productHtml from "../templates/product/product.template.html";

export class ProductComponent {
  cameraService = new CameraService();
  elProduct = document.getElementById("product");
  id;
  product;

  constructor() {
    this.retrieveProductId();
    this.getProduct();
  }

  @checkUrl(["/product.html"])
  retrieveProductId() {
    this.id = RouteHelper.getQueryParams().get("id");
  }

  @checkUrl(["/product.html"])
  async getProduct() {
    try {
      this.product = await this.cameraService.getOne(this.id);

      this.addProduct();
    } catch (e) {
      console.trace(`Cannot retrieve the product with error ${e}`);
    }
  }

  addProduct() {
    this.elProduct.innerHTML = HtmlParser(productHtml, this.product);
  }
}
