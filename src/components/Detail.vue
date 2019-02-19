<template>
  <div class="Detail">
    <h3>Details</h3>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import modelInstance from "../data/DinnerModel";

  export default {
    data() {
      return {
        text: modelInstance.getNumberOfGuests()
      }
    },

    methods: {
    }
  }
</script>