<template>
  <div class="SelectDish">
    <h2>This is the Select Dish screen</h2>
    <!-- Pass the model as a prop to the sidebar -->
    <sidebar :model="this.model"/>
    <dishes/>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    }
  }
</script>
