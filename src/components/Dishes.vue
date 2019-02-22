<template>
  <div class="Dishes">
    <h3>Dishes</h3>
    <ul>
      <em v-if='status === "LOADING"'>Loading...</em>
      <b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>
      <li v-for="dish in dishes" :id="dish.id" :key="dish.id">
        {{ dish.title }}
        <router-link to="/detail">
          <div :id="dish.id" @click="selectDish">
            <img v-bind:src="'https://spoonacular.com/recipeImages/' + dish.image" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import modelInstance from "../data/DinnerModel";

  export default {
    // this methods is called by Vue lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      modelInstance.getAllDishes().then(dishes => {
        this.status = "LOADED"
        this.dishes = dishes.results
      }).catch(() => {
        this.status = "ERROR"
      })
    },
    data() {
      return {
        status: "LOADING",
        dishes: []
      }
    },

    methods: {
      selectDish(event) {
        const id = event.currentTarget.id;
        console.log(id);
        modelInstance.getDetailedInfo(id)
        .then(ret => {
          this.status = "CLICKED";
          console.log(ret);
        })
        .catch(() => {
          this.status = "ERROR"
          alert("There is problem about fetching details!");
        });
      },
    }
  }
</script>

<style>
  img {
    width: 3cm;
    height: 3cm;
  }
</style>