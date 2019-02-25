<template>
  <div class="overview">
    <h3>Overview</h3>
    <div>
      dinner for {{ numberOfGuests }}
      <router-link to="/search">
        <button>Go back to the menu</button>
      </router-link>
    </div>

    <li v-for="dish in menu" :key="dish.id">
      {{dish.title}}
    </li>
    <router-link to="/print">
      <button>PRINT OUT MENU</button>
    </router-link>
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