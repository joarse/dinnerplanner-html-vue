<template>
  <div class="select-dish">
    <h2>This is the Select Dish screen</h2>
    <!-- We pass the model as property to the Sidebar component -->
    <input type="text"
           :value="text"
           placeholder="Enter key words"
           @input="searchText">
      <button @click="search">SEARCH</button>

    <select v-model="selected"
            @change="searchType">
      <option disabled value=""> Select a dish type</option>
      <option>Main course</option>
      <option>Appetizer</option>
      <option>Side dish</option>
      <option>Dessert</option>
      <option>Salad</option>
      <option>Bread</option>
      <option>Breakfast</option>
      <option>Soup</option>
      <option>Beverage</option>
      <option>Sauce</option>
      <option>Drinks</option>
    </select>
    <p>Message is: {{ text }} and {{ selected }}</p>

    <sidebar :model="this.model" />
    <dishes :model="this.model" />
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],

    created() {
      this.model.addObserver(this);
    },

    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    },
    data() {
      return {
        text: this.model.getQuery(),
        selected: this.model.getDishType()
      };
    },

    methods: {
      searchText(e) {
        this.model.setQuery(e.target.value);
      },
      searchType(e) {
        this.model.setDishType(e.target.value);
      },
      search() {
        this.model.setQuery(this.text);
        this.model.setDishType(this.selected);
        // Emit event so model fetches new data
        // and dishes gets updated
      },
      update() {
        this.text = this.model.getQuery();
        this.selected = this.model.getDishType();
      }
    }
  }
</script>
