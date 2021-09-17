import {
  BasketComponent,
  HomeComponent,
  OrderConfirmComponent,
  ProductComponent,
} from "./components";
import { BasketHelper } from "./helpers";
import "./style/style.scss";

new HomeComponent();
new ProductComponent();
new BasketComponent();
new OrderConfirmComponent();

new BasketHelper().updateBasketQuantity();
