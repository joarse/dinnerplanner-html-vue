<template>
  <div class="Detail">
    <h3>Details</h3>
    <router-link to="/search">
      <button>Go back to the menu</button>
    </router-link>
    <p>{{dish.title}}</p>
    <p>{{dish.id}} </p>
    <li v-for="ingredient in dish.extendedIngredients" :key="ingredient.id">
      {{ingredient.name}} {{ingredient.amount}} {{ingredient.unit}} {{1}} SEK
    </li>
    <router-link  to="/search">
      <button @click="add"> ADD TO MENU</button>
    </router-link>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import modelInstance from "../data/DinnerModel";

  export default {
    mounted() {
      this.id = modelInstance.getSelectedDishID();
      console.log(this.id);
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      modelInstance.getDetailedInfo(this.id).then(dish => {
        this.status = "LOADED"
        this.dish = dish
      }).catch(() => {
        this.status = "ERROR"
      })
    },
    data() {
      return {
        status: "LOADING",
        id: modelInstance.getSelectedDishID(),
        dish: [],
        text: modelInstance.getNumberOfGuests(),
      }
    },
    methods: {
      add() {
        modelInstance.addDishToMenu(this.dish);
      }
    }
  }
</script>