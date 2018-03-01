<template>
  <div class="Dishes">
    <h3>Dishes</h3>
    <ul>
      <em v-if='status === "INITIAL"'>Loading...</em>
      <b v-if='status === "ERROR"'>Failed to load data, please try again</b>
      <li v-for="dish in dishes" v-bind:id="dish.id">
        {{ dish.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  import {getAllDishes} from "../DishesAPI";

  export default {
    mounted() {
      getAllDishes().then(dishes => {
        this.status = 'LOADED'
        this.dishes = dishes.results
      }).catch(() => {
        this.status = 'ERROR'
      })
    },
    data() {
      return {
        status: 'INITIAL',
        dishes: []
      }
    }
  }
</script>
