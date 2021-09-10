import { checkUrl } from "../decorators";
import { RouteHelper } from "../helpers/route.helper";
import { CameraService } from "../services";

export class ProductComponent {
  cameraService = new CameraService();
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

      this.addArticles();
    } catch (e) {
      console.trace(`Cannot retrieve the product with error ${e}`);
    }
  }
}
