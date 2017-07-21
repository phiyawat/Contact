,
<template>
    <!-- : , {{}}, v-model = contact<.>id  that is props -->
    <!-- modalId,id that is :id for contactEditor and confirmModal  -->
    <div class="ui center aligned segment">
        <SearchPanel @onClickedAdd="openContactEditor('Add')"></SearchPanel>
        <DataPager></DataPager>
        <div class="ui center aligned segment">
            <CardList remove="cardList" :items="items" @onEditClicked="onEditClicked" @onRemoveClicked="onRemoveClicked"></CardList>
        </div>
        <ContactEditor modalId="contactModal" :contact="contact" :mode="mode" @onSaveClicked="validateContact"></ContactEditor>
        <ConfirmModal id="confirmModal" header="Deleting" :message="msgDelete" @onOKClicked="onOKClicked"></ConfirmModal>
    </div>
</template>

<script> 
import SearchPanel from '@/components/SearchPanel' 
import DataPager from '@/components/DataPager' 
import CardList from '@/components/CardList' 
import CardItem from '@/components/CardItem'
import ContactsStore from '@/store/Contacts'
import ContactsApi from '@/api/Contact'
import ContactEditor from '@/components/ContactEditor'
import ConfirmModal from '@/components/ConfirmModal'
import $ from 'jquery'

export default { 
    
    components: {SearchPanel,DataPager,CardList,CardItem,ContactEditor,ConfirmModal}, 

     mounted () {   
         this.items = ContactsStore.getters.contacts 
        }, 

    data(){
      return {
      items: [],
      mode: [],
      msgDelete: [],
      contact: [],
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
                $('#contactModal').modal('hide') 
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
                  console.log("add") 
               this.contact = {}    
              $('#contactId').attr('disabled', false)
               break

                case 'Edit':  
                console.log("edit") 
                $('#contactId').attr('disabled', true)         
                break     
            }
            $('.ui.error.message').transition('hide') 
           $('#contactModal').modal('show') 
        },

         validateContact () {    
             $('.ui.form').form(this.validateRule)   
        },
         
          addContact () {  
              console.log("addContact 1") 
              //console.log(this.contact)  

              ContactsApi.add(this.contact)
              
              .then((result) => { 

                  if (result.status === 200 && result.data.ok === 1) {     
                      console.log("success")    
                     // this.showMessage('Insert', 'Success')  
                     // this.getContact({condition: {}})     
                    } 
                    else { 
                        console.log("fail")        
                        this.showMessage('Insert', 'Error', result.statusText)       
                    }     
                })
                .catch((result) => {  
                    console("a")     
                    this.showMessage('Insert', 'Error', JSON.stringify(result))     
                })   
            },   
        
        editContact () {     
            var data = this.contact     
            delete data['_id']     
            var condition = { 
                'criteria': {'_id': this.contact['_id']}, 
                'data': {'$set': data}}     
                ContactsApi.update(condition)     
                .then((result) => {      
                    if (result.status === 200 && result.data.ok === 1) {         
                        this.showMessage('Update', 'Success')         
                        this.getContact({condition: {}})         
                        ContactsStore.dispatch( 'setCurrentPage' , 1)       
                    } 
                    else {        
                         this.showMessage('Update', 'Error', result.statusText)       
                        }     
                    }).catch((result) => {       
                        this.showMessage('Update', 'Error', JSON.stringify(result))     
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
            console.log("remove")   
            this.contact = item     
            this.msgDelete = `Are you sure to delete contact of ${this.contact.firstName + ' ' + this.contact.lastName} [y/n] ?`     
            $('#confirmModal').modal('show')   
        },

        showMessage (action, status, unhandleMsg) {     
            let MODAL_MESSAGE_ID = '#modalMessage'     
            this.headerTitle = status     
            switch (status) {     
                 case 'Success':      
                 $(MODAL_MESSAGE_ID).removeClass('error message')         
                 $(MODAL_MESSAGE_ID).addClass('success message')         
                 this.message = `${action} successfully.`         
                 break
                 case 'Error':         
                 $(MODAL_MESSAGE_ID).removeClass('success message')         
                 $(MODAL_MESSAGE_ID).addClass('error message')         
                 this.message = `${action} ${unhandleMsg}`         
                 break     
            }     
                $('#modalMessage').modal('show')   
            },

             getSearchCondition () {     
                 var condition = {condition: {}}     
                 if (this.textSearch.length > 0) {       
                     condition.condition = {
                         '$or': [           
                         {'id': {'$regex': `.*${this.textSearch}.*`}},           
                         {'firstName': {'$regex': `.*${this.textSearch}.*`}},           
                         {'lastName': {'$regex': `.*${this.textSearch}.*`}} ]       
                        }     
                    }     
                    return condition   
            },

            onOKClicked () {     
                var condition = { 'id': this.contact.id}     
                $('#confirmModal' ).modal('hide')

                ContactsApi.remove(condition)
                     
                .then((result) => {       
                    if (result.status === 200 && result.data.ok === 1) {         
                        this.showMessage('Delete', 'Success')         
                        this.contact = {}         
                        ContactsStore.dispatch( 'setCurrentPage' , 1)         
                        this.getContact({condition: {}})       
                    } 
                    else {         
                        this.showMessage('Delete', 'Error', result.statusText)       
                    }     
                })
                .catch((result) => {       
                    this.showMessage('Delete', 'Error', JSON.stringify(result))     
                })   
            }

    },

      watch: {   
                getCurrentPage: function (val) {     
                    var condition = this.getSearchCondition()     
                    condition.currentPage = (val < 1 ? 1 : val)     
                    this.getContact(condition)   
                } 
            }

    }
     
</script>