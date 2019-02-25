<template>
  <div class="print">
    <h3>Dinner for {{ numberOfGuests }} people</h3>
    <div class="row">
      <div class="col-md-12" id="back">
        <router-link to="/search">
          <button class="btn btn-primary">Go back to the menu</button>
        </router-link>
      </div>
    </div>
    <div class="row" v-for="dish in menu" :key="dish.id">
      <div class="col-md-2">
        <img v-bind:src="dish.image" />
      </div>
      <div class="col-md-4">
        <h3> {{dish.title}}</h3>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div class="col-md-6">
        <h3> Preperations</h3>
        
        <p v-if="dish.instructions"> {{dish.instructions}}</p>
        <p v-else> Oh, sorry, no instructions found</p>
      </div>
    </div>

     
    </div>
</template>

<script>
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
      this.numberOfGuests = this.model.getNumberOfGuests();
      // TODO: we should bind the menu here;
    },
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: this.model.getMenu()
      };
    },
    methods: {
      update() {
        // we should just re-read the menu from model here
        this.menu = this.model.getMenu();
      },
    }
  }
</script>

<style>
  #back {
    float: right;
    text-align: right;
  }
</style>