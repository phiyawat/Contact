import axios from "axios";

export default {
  add: data => {
    console.log("data", data);
    let url = "http://localhost:3000/contacts/add";
    return axios.post(url, data);
  },
  update: condition => {
    console.log("update", condition);
    let url = "http://localhost:3000/contacts/update";
    return axios.put(url, condition);
  },
  remove: condition => {
    console.log("remove", condition);
    let url = "http://localhost:3000/contacts/delete";
    return axios.delete(url, { data: condition });
  }
};
