<template>
  <div class="Sidebar">
    <h3>This is the sidebar</h3>
    <p>
      People: <input :value="numberOfGuests" @input="onDidChangeNumberOfGuests" @change="onDidChangeNumberOfGuests"/>
      <br/>
      Total number of guests: {{ numberOfGuests }}
    </p>
  </div>
</template>

<script>
  export default {
    props: ['model'],
    created() {
      this.model.addObserver(this)
    },
    beforeDestroy() {
      this.model.removeObserver(this)
    },
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests()
      }
    },
    methods: {
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests()
      },
      onDidChangeNumberOfGuests(e) {
        this.model.setNumberOfGuests(+e.target.value)
      }
    }
  }
</script>
