export class GlobalService {
  originUrl = process.env.API_URL;
  service;

  constructor(service) {
    this.service = service;
  }

  /**
   * Get all elements for a given service
   *
   * @returns {Promise} A promise of elements list
   */
  async getAll() {
    const res = await fetch(`${this.originUrl}${this.service}/`);

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }

  /**
   * Get one element for a given service based on its id
   *
   * @param {number} id - The id of the element
   * @returns {Promise} A promise of the element
   */
  async getOne(id) {
    const res = await fetch(`${this.originUrl}${this.service}/${id}`);

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }

  /**
   * Create a new order for a given service
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

    const res = await fetch(`${this.originUrl}${this.service}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return Promise.reject(`Error ${res.status}`);
    }

    const json = await res.json();
    return Promise.resolve(json);
  }
}
