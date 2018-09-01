<template>
 <v-container fluid>
        <blockquote class="blockquote text-xs-center">
          Welcome home <br>
        </blockquote>
    <h1>{{msg}}</h1>
    <v-btn color='primary' dark @click="getUsers">GetUsers</v-btn>
    
    <ul v-for="item in getUsersList"><li>{{item.username}}</li><li>{{item.email}}</li><li>{{item.createdAt}}</li></ul>
  </v-container>

</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App home",
      name: "",
      email: "",
      getUsersList: ""
    };
  },
  methods: {
    getUsers: function() {
      axios
        .get("http://localhost:4200/users/")
        .then(users => {
          this.getUsersList = users.data;
          console.log(users, typeof users);
        })
        .catch(err => {
          console.log("Its errors: ", err);
        });
    }
  },

  beforeRouteEnter(to, from, next) {
    var token = localStorage.getItem("token");
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
