export class RouteHelper {
  /**
   * Display the current URL
   *
   * @return {string}
   */
  static getUrl() {
    return window.location.pathname;
  }

  /**
   * Check if the current URL if the same than the expected one(s)
   *
   * @param {Array} urlList - The url list
   * @example checkUrl(['/', '/index.html'])
   */
  static checkUrl(urlList) {
    return urlList.includes(RouteHelper.getUrl());
  }
}
