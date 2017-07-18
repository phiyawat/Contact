<template>
    <!-- :mode     to binding return data() -->
    <div class="ui center aligned segment">
        <SearchPanel @onClickedAdd="openContactEditor('Add')"></SearchPanel>
        <ContactEditor modalId="contactModal" :contact="contact" :mode="mode" @onSaveClicked="validateContact"></ContactEditor>
        <DataPager></DataPager>
        <div class="ui center aligned segment">
            <CardList :items="items" @onEditClicked="onEditClicked" @onRemoveClicked="onRemoveClicked"></CardList>
        </div>
    </div>
</template>

<script> 
import SearchPanel from '@/components/SearchPanel' 
import DataPager from '@/components/DataPager' 
import CardList from '@/components/CardList' 
import CardItem from '@/components/CardItem'
import ContactsStore from '@/store/Contacts'
import ContactEditor from '@/components/ContactEditor'

export default { 
    name: 'contacts',

    components: {SearchPanel,DataPager,CardList,CardItem,ContactEditor},

     mounted () {   
         this.items = ContactsStore.getters.contacts 
        }, 

    data(){
      return {
      mode: [],
      contact: [],
      items: [],
      validateRule: {       
          fields: {         
              contactId: {           
                  identifier: 'contactId',           
                  rules: [{             
                      type: 'empty',             
                      prompt: 'Please enter Contact ID!'           
                    }]         
                },
             firstName: {           
                 identifier: 'firstName',           
                 rules: [{             
                     type: 'empty',             
                     prompt: 'Please enter First Name!'           
                    }]         
                },         
            lastName: {           
                identifier: 'lastName',           
                rules: [{             
                    type: 'empty',             
                    prompt: 'Please enter Last Name!'           
                }]         
            },
            mobileNo: {           
                identifier: 'mobileNo',           
                rules: [{             
                    type: 'empty',             
                    prompt: 'Please enter Mobile No!'           
                }]         
            }       
            },
            onFailure: (formErrors, fields) => {
                console.log("Fail")         
                $('.ui.error.message').transition('show')       
            },       
            onSuccess: () => {   
                console.log("save")          
                this.saveContact(this.mode)  
                console.log("1")       
                $('.ui.modal').modal('hide') 
                console.log("2")    

            }     
        }         
    }
          
    },

    methods: {

       openContactEditor (mode) {
           this.mode = mode     
           switch (mode) {       
               case 'Add': 
               this.contact = {}    
              $('#contactId').attr('disabled', false)
               break

                case 'Edit':  
                console.log("edit") 
                $('#contactId').attr('disabled', false)         
                break     
            }
            $('.ui.error.message').transition('hide')  
           $('.ui.modal').modal('show') 
        },

         validateContact () {    
             $('.ui.form').form(this.validateRule)   
        },
         
         addContact () {     
             ContactsStore.dispatch('addContact', this.contact)     
             .then(() => {       
                 this.contacts = ContactsStore.getters.contacts     
            })   
        },   
        
        editContact () {     
            ContactsStore.dispatch('updateContact', this.contact)      
            .then(() => {        
                this.contacts = ContactsStore.getters.contacts      
            })   
        },

         saveContact (mode) {     
             switch (mode) {       
                 case 'Add':  
                 console.log("savetoAdd")       
                 this.addContact()         
                 break       
                 case 'Edit':         
                 this.editContact()         
                 break     
                }   
        },

        onEditClicked (item) {     
            this.contact = item     
            this.openContactEditor('Edit')   
        },

        onRemoveClicked (item) {     
            console.log('remove clicked')     
            ContactsStore.dispatch('removeContact', item)      
            .then(() => {        
                this.contacts = ContactsStore.getters.contacts      
            })   
        }

    }
       
} 
</script>