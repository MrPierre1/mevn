<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>You've successfully logged in</v-toolbar-title>
    </v-toolbar>
    <ul v-for="item in data.data" :key="item.title">
      <li>{{item.author}}</li>
      <li>{{item.title}}</li>
      <li>{{item.date}}</li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
  export default {
    
    name: 'SecretPage',
    data: () => ({
      data: ''
    }),

    computed: {
    },

    created () {
    
          axios
        .get("http://localhost:4200/secret/")
        .then(value => {
          this.data = value
        })
        .catch(err => {
          console.log("Its errors: ", err);
        });

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
  },

    methods: {
      }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
