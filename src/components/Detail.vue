<template>
  <div class="Detail">
    <h3>Details</h3>
    <router-link to="/search">
      <button>Go back to the menu</button>
    </router-link>
    <br />
    <em v-if='status === "LOADING"'>Loading...</em>
    <h4>{{dish.title}}</h4>
    <li v-for="ingredient in dish.extendedIngredients" :key="ingredient.id">
      {{ingredient.name}} {{ingredient.amount}} {{ingredient.unit}} {{1}} SEK
    </li>
    <router-link to="/search">
      <button @click="add" v-if="status == 'LOADED'">ADD TO MENU</button>
    </router-link>
  </div>
</template>

<script>
/***
 * If we bind the model in the router with `props`, we don't need to import the actual file from relateive path
 */
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
// import modelInstance from "../data/DinnerModel";

export default {
  props: ["model"],
  // this methods is called by React lifecycle when the
  // component is created that's a good place to setup model observer
  created() {
    this.model.addObserver(this);
  },

  // this is called when component is removed destroyed
  // good place to remove observer
  beforeDestroy() {
    this.model.removeObserver(this);
  },

  mounted() {
    this.id = this.model.getSelectedDishID();
    // when data is retrieved we update it's properties
    // this will cause the component to re-render
    this.model.getDetailedInfo(this.id).then(dish => {
      this.status = "LOADED"
      this.dish = dish
    }).catch(() => {
      this.status = "ERROR"
    })
  },

  data() {
    return {
      status: "LOADING",
      id: this.model.getSelectedDishID(),
      dish: {},
      text: this.model.getNumberOfGuests(),
    }
  },

  methods: {
    update() {
    },
    add() {
      this.model.addDishToMenu(this.dish);
    }
  }
}
</script>
