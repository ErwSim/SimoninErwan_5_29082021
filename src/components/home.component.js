import {
  CameraController,
  FurnitureController,
  TeddyController,
} from "../controllers";
import { checkUrl } from "../decorators";

export class HomeComponent {
  cameraController = new CameraController();
  furnitureController = new FurnitureController();
  teddyController = new TeddyController();

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
      this.articles = await Promise.all([
        this.cameraController.getAll(),
        this.furnitureController.getAll(),
        this.teddyController.getAll(),
      ]);

      this.addCategories();
    } catch (e) {
      console.trace(`Cannot retrieve all articles with error ${e}`);
    }
  }

  addCategories() {
    const categories = [
      "Ours en peluche faits à la main",
      "Caméras vintage",
      "Meubles en chêne",
    ];

    for (let i = 0; i < categories.length; i++) {
      const elCategories = document.createElement("div");
      const elTitle = document.createElement("h2");
      const elArticleList = document.createElement("div");

      elCategories.className = "mt-3";
      elArticleList.className = "card-wrapper";

      this.elArticles.appendChild(elCategories);
      elCategories.appendChild(elTitle);
      elCategories.appendChild(elArticleList);

      elTitle.innerText = categories[i];

      this.addArticles(i, elArticleList);
    }
  }

  addArticles(categoryId, element) {
    for (const article of this.articles[categoryId]) {
      console.log(article);
      const elCard = document.createElement("div");
      const elImg = document.createElement("img");
      const elCardBody = document.createElement("div");
      const elCardBodyTitle = document.createElement("h5");
      const elCardLink = document.createElement("a");

      elCard.className = "card";
      elImg.className = "card-img-top";
      elCardBody.className = "card-body";
      elCardBodyTitle.className = "card-title";
      elCardLink.classList.add("btn", "btn-primary", "card__button");

      elImg.src = article.imageUrl;
      elCardLink.href = `product.html?id=${article._id}`;
      elCardLink.title = "En savoir plus";

      elCardBodyTitle.innerText = article.name;
      elCardLink.innerText = "En savoir plus";

      element.appendChild(elCard);
      elCard.appendChild(elImg);
      elCard.appendChild(elCardBody);
      elCard.appendChild(elCardLink);
      elCardBody.appendChild(elCardBodyTitle);
    }
  }
}
