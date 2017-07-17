<template>

    <div class="ui modal">

        <div class="header">Contact
            <div class="ui teal horizontal label">{{mode}}</div>
        </div>


        <div class="content">
            <form class="ui form" v-on:submit.prevent>
                <div class="field required">
                    <label>Contact ID</label>
                    <input id="contactId" type="text" v-model="contact" placeholder="Contact ID">
                    <p> My message form v-model is : {{contact}} </p>
                </div>
                <div class="field required">
                    <label>First Name</label>
                    <input id="firstName" type="text" placeholder="First Name">
                </div>
                <div class="field required">
                    <label>Last Name</label>
                    <input id="lastName" type="text" placeholder="Last Name">
                </div>
                <div class="field required">
                    <label>Mobile No</label>
                    <input id="mobileNo" type="text" placeholder="Mobile No">
                </div>
                <div class="field">
                    <label>Email</label>
                    <input id="email" type="email" placeholder="Email">
                </div>
                <div class="field">
                    <label>Facebook</label>
                    <input id="facebook" type="text" placeholder="Facebook">
                </div>
                <div class="field">
                    <label>Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Image Url">
                </div>
                <div class="ui buttons center aligned container">
                    <button class="ui primary basic button" @click="onSaveClicked">
                        <i class="save icon"></i>Save</button>
                    <button class="ui primary basic button" @click="onCloseClicked">
                        <i class="close red icon"></i>Close</button>
                </div>
                <div class="ui error message transition hidden"></div>
            </form>
        </div>
    </div>

</template>

<script> 
import $ from 'jquery' 
export default { 

    props: ['modalId', 'mode', 'contact'], 
    methods: {   
        onSaveClicked (e) {     
            this.$emit('onSaveClicked')   
        },   
        onCloseClicked () {
            console.log("close")     
            $('.ui.modal').modal('hide')

        } 
    } 
} 
</script>