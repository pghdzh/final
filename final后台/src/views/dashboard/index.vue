<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale/>
    
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale' 

export default {
  name: 'Dashboard',
  components:{
    Card,
    Sale,
    
  },
  
}
</script>

<style lang="scss" scoped>
</style>
