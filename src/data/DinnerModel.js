import ObservableModel from "./ObservableModel";



class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this._query = "";
    this._dishType = "";
    this._selectedDishID = -1;
    this._menu = {}; // unsure about which data structure we should use

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
    if (localStorage.numberOfGuests) {
      this._numberOfGuests = localStorage.numberOfGuests;
    }
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
    localStorage.numberOfGuests = this._numberOfGuests;
    this.notifyObservers("setNumberOfGuests");
  }

  /**
   * Get the query users have typed
   * @returns {string}
   */
  getQuery() {
    if (localStorage.query) {
      this._query = localStorage.query;
    }
    return this._query;
  }

  /**
   * Set the query string
   * @param {string} searchInput
   */
  setQuery(searchInput) {
    this._query = searchInput;
    localStorage.query = searchInput;
    this.notifyObservers("setQuery");
  }

  /**
   * Get the type of dish users have typed
   * @returns {string}
   */
  getDishType() {
    if (localStorage.dishType) {
      this._dishType = localStorage.dishType;
    }
    return this._dishType;
  }

  /**
   * Set the type of dish
   * @param {string} dishTypeInput
   */
  setDishType(dishTypeInput) {
    this._dishType = dishTypeInput;
    localStorage.dishType = dishTypeInput;
    this.notifyObservers("setDishType");
  }

  /**
   * Get the selected dish id users have chosen
   * @returns {string}
   */
  getSelectedDishID() {
    if (localStorage.selectedDishID) {
      this._selectedDishID = localStorage.selectedDishID;
    }
    return this._selectedDishID;
  }

  /**
   * Set the selected dish id
   * @param {number} id
   */
  setSelectedDishID(id) {
    this._selectedDishID = id;
    localStorage.selectedDishID = id;
    this.notifyObservers("setSelectedDishID");
  }

  /**
   * Add dish to menu
   * @params {dish object}
   */
  addDishToMenu(dish) {
    this._menu[dish.id] = dish;
    localStorage.setItem('menu', JSON.stringify(this._menu));
    this.notifyObservers("addDishToMenu");
  }

  /**
   * Remove dish from menu
   * @param {number} id
   */
  removeDishFromMenu(id) {
    delete this._menu[id];
    localStorage.setItem('menu', JSON.stringify(this._menu));
    this.notifyObservers("removeDishFromMenu");
  }

  /**
   * Get the menu
   * @returns {object}
   */
  getMenu() {
    if (localStorage.getItem('menu')) {
      this._menu = JSON.parse(localStorage.getItem('menu'));
    }
    return this._menu;
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
    const url = `${this.BASE_URL}/recipes/search?query=${this.getQuery()}&type=${this.getDishType()}`;
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
      .then(response => this.processResponse(response))
      .catch(e => {
        alert("There's something wrong while getting detailed info of a dish");
        console.log(e);
      });
  }
}



// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
