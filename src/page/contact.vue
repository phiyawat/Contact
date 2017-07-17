<template>
    <div class="ui center aligned segment">
        <SearchPanel @onClickedAdd="openContactEditor('Add')"></SearchPanel>
        <ContactEditor mode="Add" @onSaveClicked="validateContact"></ContactEditor>
        <DataPager></DataPager>
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

    components: {SearchPanel,DataPager,CardList,CardItem,ContactEditor},

    data(){
      return {
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
                //this.saveContact(this.mode)         
                $('.ui.modal').modal('hide')       
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
                $('#contactId').attr('disabled', true)         
                break     
            }
    
            $('.ui.error.message').transition('hide')  

           $('.ui.modal').modal('show') 
        },

         validateContact () {    
      
             $('.ui.form').form(this.validateRule)   

        }
    }
       
} 
</script>