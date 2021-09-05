import { CameraService } from "../services";
import { checkUrl } from "../decorators";
import { NumberHelper } from "../helpers";

export class HomeComponent {
  cameraService = new CameraService();

  elArticles = document.getElementById("articles");
  articles;

  constructor() {
    this.getArticles();
  }

  /**
   * Get all articles
   *
   * @returns {Array} - List of articles
   */
  @checkUrl(["/", "/index.html"])
  async getArticles() {
    try {
      this.articles = await this.cameraService.getAll();

      this.addArticles();
    } catch (e) {
      console.trace(`Cannot retrieve all articles with error ${e}`);
    }
  }

  /**
   * Add articles in the dom
   */
  addArticles() {
    for (const article of this.articles) {
      const elCard = document.createElement("div");
      const elImg = document.createElement("img");
      const elCardBody = document.createElement("div");
      const elCardBodyTitle = document.createElement("h5");
      const elCardBodyPrice = document.createElement("p");
      const elCardLink = document.createElement("a");

      elCard.className = "card";
      elImg.className = "card-img-top";
      elCardBody.className = "card-body";
      elCardBodyPrice.className = "card-text";
      elCardBodyTitle.className = "card-title";
      elCardLink.classList.add("btn", "btn-primary", "card__button");

      elImg.src = article.imageUrl;
      elCardLink.href = `product.html?id=${article._id}`;
      elCardLink.title = "En savoir plus";

      elCardBodyTitle.innerText = article.name;
      elCardBodyPrice.innerText = NumberHelper.priceOf(article.price);
      elCardLink.innerText = "En savoir plus";

      this.elArticles.appendChild(elCard);
      elCard.appendChild(elImg);
      elCard.appendChild(elCardBody);
      elCard.appendChild(elCardLink);
      elCardBody.appendChild(elCardBodyTitle);
      elCardBody.appendChild(elCardBodyPrice);
    }
  }
}
