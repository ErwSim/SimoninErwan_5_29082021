export class GlobalController {
  // TODO à mettre sur une variable env
  originUrl = "http://localhost:3000/api/";
  controller;

  constructor(controller) {
    this.controller = controller;
  }

  /**
   * Get all elements for a given controller
   *
   * @returns {Promise} A promise of elements list
   */
  async getAll() {
    const res = await fetch(`${this.originUrl}${this.controller}/`);

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }

  /**
   * Get one element for a given controller based on its id
   *
   * @param {number} id - The id of the element
   * @returns {Promise} A promise of the element
   */
  async getOne(id) {
    const res = await fetch(`${this.originUrl}${this.controller}/${id}`);

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }

  /**
   * Create a new order for a given controller
   *
   * @param {string} firstName - The firstname of the customer
   * @param {string} lastName - Last lastname of the customer
   * @param {string} address - The address of the customer
   * @param {string} city - The city of the customer
   * @param {string} email - The email of the customer
   * @param {array} products - The products which have to be ordered
   * @returns {Promise} A promise of the payload returned by the server plus the orderId
   */
  async createOrder(firstName, lastName, address, city, email, products) {
    const payload = {
      contact: {
        firstName,
        lastName,
        address,
        city,
        email,
      },
      products,
    };

    const res = await fetch(`${this.originUrl}${this.controller}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    });

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }
}
