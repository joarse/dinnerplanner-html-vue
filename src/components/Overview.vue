<template>
  <div class="overview">
    <h3> Dinner for {{ numberOfGuests }} people</h3>
    <div class="row">
      <div id="back" class="col-md-12">
        <router-link to="/search">
          <button class="btn btn-primary">Go back to the menu</button>
        </router-link>
      </div>

      <div class="container text-center" id="dishFinishedView">
        <div class="row">
          <div class="col-md-4" v-for="dish in menu" :key="dish.id">

            <img v-bind:src="dish.image" />
            <br />
            {{dish.title}}
            <br />
            <p>Price: cost SEK</p>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="mx-auto">
        <router-link to="/print">
          <button class="btn btn-primary">PRINT OUT MENU</button>
        </router-link>
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
    text-align:right;
  }

</style>