<template>
    <div class="ui four stackable cards">
        <CardItem v-for="a in items" :item="a" :key="a.id" @onEditClicked="onEditClicked" @onRemoveClicked="onRemoveClicked">
        </CardItem>
    </div>
</template>

<script> 
import CardItem from '@/components/CardItem'
export default { 

    components: {CardItem},

    data() {
        return {
          item: [],
          key: [],
          items: [       
              {         
                  'firstName': 'Kristy',         
                  'lastName': 'Chung',         
                  'mobileNo': '099-000-1234',         
                  'email': 'kristy@vuejs.com',         
                  'facebook': 'https://facebook.com/kristy',         
                  'imageUrl': './static/images/1.jpg'       
              }      
            ]    
        } 
    },

    methods: {
         onEditClicked (item) {   
             this.$emit('onEditClicked', item)   
        },   
        onRemoveClicked (item) {     
            this.$emit('onRemoveClicked', item)   
        }
    }
} 
</script>