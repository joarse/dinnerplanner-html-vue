import ObservableModel from "./ObservableModel";



class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.query = "";

    this.apiKey = "";
    this.BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/49";
    this.httpOptions = {
      headers: { "X-Mashape-Key": this.apiKey }
    };
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    if (num > 0) {
      this._numberOfGuests = num;
    } else {
      this._numberOfGuests = 1;
    }
    this.notifyObservers();
  }

  getQuery() {
    return this.query;
  }

  setQuery(searchInput) {
    this.query = searchInput
    this.notifyObservers();
  }

  // API methods

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${this.BASE_URL}/recipes/search`;
    return fetch(url, this.httpOptions)
      .then(response => this.processResponse(response));
  }

  /**
   * Do an API call to get the detailed info of dish `id`.
   * @returns {Promise<any>}
   */
  getDetailedInfo(id) {
    const url = `${this.BASE_URL}/recipes/${id}/information`;

    return fetch(`${url}?includeNutrition=false`, this.httpOptions)
      .the(response => this.processResponse(response))
      .catch(e => {
        alert("There's something wrong while getting detailed info of a dish");
        console.log(e);
      });
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
