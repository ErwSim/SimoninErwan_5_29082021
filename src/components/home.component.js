import { CameraService } from "../services";
import { checkUrl } from "../decorators";
import { HtmlParser, NumberHelper } from "../helpers";
import articlesHtml from "../templates/home/articles.template.html";

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
    let articleHtml = "";
    for (const article of this.articles) {
      article.price = NumberHelper.priceOf(article.price);
      articleHtml += HtmlParser(articlesHtml, article);
    }

    this.elArticles.innerHTML = articleHtml;
  }
}
