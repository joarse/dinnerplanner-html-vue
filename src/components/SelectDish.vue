<template>
  <div class="select-dish">
    <h2>This is the Select Dish screen</h2>
    <!-- We pass the model as property to the Sidebar component -->
    <input type="text"
           :value="text"
           placeholder="edit me"
           @input="search">
    <button @click="search">
      SEARCH
    </button>
    <p>Message is: {{ text }}</p>

    <sidebar :model="this.model" />
    <dishes />
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],

    created() {
      this.model.addObserver(this);
    },

    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    },
    data() {
      if (localStorage.query) {
        this.model.setQuery(localStorage.query);
      }
      return {
        text: this.model.getQuery()
      };
    },

    methods: {
      search(e) {
        this.model.setQuery(e.target.value);
        localStorage.query = e.target.value;
      }, 
      update() {
        this.text = this.model.getQuery();
      }
    }
  }
</script>
