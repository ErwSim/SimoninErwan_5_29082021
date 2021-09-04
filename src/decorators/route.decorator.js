import { RouteHelper } from "../helpers/route.helper";

/**
 * Decorator to check if the current URL belongs one of the wanted ones
 *
 * @param {Array} urlList - The list of the URL(s)
 */
export function checkUrl(urlList) {
  return function decorator(target, name, descriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args) {
      if (!RouteHelper.checkUrl(urlList)) return;

      method.apply(this, args);
    };
  };
}
