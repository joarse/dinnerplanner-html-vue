<template>
  <div class="sidebar">
    <h3>My dinner</h3>
    <p>
      People:
      <input
        class="guestInput"
        type="number"
        :value="numberOfGuests"
        @input="onDidChangeNumberOfGuests"
        @change="onDidChangeNumberOfGuests"
      >
      <br>
    </p>
    <table>
      <tr class="tableHeader">
        <th>Dish name</th>
        <th>Cost</th>
      </tr>
      <tr class="tableBody" v-for="dish in menu" :key="dish.id"  @click="removeFromMenu(dish.id)" >
        <th>{{dish.title}}</th> 
        <th> cost</th>
      </tr>
    </table>
   


    <router-link to="/overview">
      <button v-if="Object.values(menu).length !== 0">Confirm Dinner</button>
    </router-link>

  </div>
</template>

<script>
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

  // we define and initalise the data we want to use and modify in the component
  data() {
    return {
      numberOfGuests: this.model.getNumberOfGuests(),
      menu: this.model.getMenu(),
    };
  },

  methods: {
    // in our update function we modify the the property of
    // the compoented which will cause the component to re-render
    update() {
      this.numberOfGuests = this.model.getNumberOfGuests();
      // we should just re-read the menu from model here
      this.menu = this.model.getMenu();
    },

    // our handler for the input's on change event
    onDidChangeNumberOfGuests(e) {
      this.model.setNumberOfGuests(+e.target.value);

    },
    removeFromMenu(id) {
      this.model.removeDishFromMenu(id);
    }
  }
};
</script>


<style>

  .sidebar {
    float: left;
    width: 20%;
    height: 100%;
  }
  .guestInput{
    float: right;
    width: 60%;
    margin-right: 10%;
  }
  .tableBody{
    background-color: lightgray;
  }
  .tableHeader{
    background-color: darkgray;
  }

  

</style>
