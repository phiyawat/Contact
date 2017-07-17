import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    contact: {},

    getters: {
      contacts: state => state.contacts
    }
  },

  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    UPDATE_CONTACT(state, contact) {
      let contacts = state.contacts.filter(contact => {
        return contact.id === contact.id;
      });
      state[state.contacts.indexOf(contacts[0])] = contact;
    },
    REMOVE_CONTACT(state, contact) {
      state.contacts.splice(state.contacts.indexOf(contact), 1);
    }
  },

  actions: {
    addContact({ commit }, contact) {
      commit("ADD_CONTACT", contact);
    },
    updateContact({ commit }, contact) {
      commit("UPDATE_CONTACT", contact);
    },
    removeContact({ commit }, contact) {
      commit("REMOVE_CONTACT", contact);
    }
  }
});
