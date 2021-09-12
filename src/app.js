import { BasketComponent, HomeComponent, ProductComponent } from "./components";
import { BasketHelper } from "./helpers";
import "./style/style.scss";

new HomeComponent();
new ProductComponent();
new BasketComponent();

new BasketHelper().updateBasketQuantity();
