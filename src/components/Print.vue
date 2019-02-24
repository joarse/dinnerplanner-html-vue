<template>
  <div class="print">
    <h3>print</h3>

  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import modelInstance from "../data/DinnerModel";

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
      const dish = this.model.getMenu();
      console.log(dish.id);
      this.menu.push(dish);
    },
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: [] // dont know which data structure this should be
      };
    },
    methods: {
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests();
        const dish = this.model.getMenu();
        console.log(dish.id);
        this.menu.push(dish);
        // update the menu here
      },
    }
  }
</script>