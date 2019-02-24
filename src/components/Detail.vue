<template>
  <div class="Detail">
    <h3>Details</h3>
    <p>
      {{ dish.title }}
    </p>
    <p>{{dish.id}} </p>
    <p>{{dish.amount}}</p>
    <p>{{dish.price}}</p>
    <li v-for="ingredient in dish.extendedIngredients">
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
        id: -1,
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