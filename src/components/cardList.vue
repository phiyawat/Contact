<template>
    <div class="ui four stackable cards">
        <CardItem v-for="a in items" :item="a" :key="a.id"> </CardItem>
    </div>
</template>

<script> 
import CardItem from '@/components/CardItem'
export default { 
    
    components: {CardItem},
    props: ['items']
} 
</script>