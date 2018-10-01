<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title> {{user }}You've accessed the secret page.  </v-toolbar-title>
    </v-toolbar>
    <!-- <ul v-for="item in data.data" :key="item.title">
      <li>{{item.author}}</li>
      <li>{{item.title}}</li>
      <li>{{item.date}}</li>
    </ul> -->

    <table style="width:100%"  >
  <tr>
    <th>Title</th>
    <th>Author</th> 
    <th>Date</th>
  </tr>
  <tr  v-for="item in data.data" :key="item.title">
    <td>{{item.title}}</td>
    <td>{{item.author}}</td> 
    <td>{{item.date}}</td>
  </tr>
  
</table>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SecretPage",
  data: () => ({
    data: "", 
    user: '', 
    token: ''
  }),

  computed: {},

  created() {

      var token = localStorage.getItem("token")
       var parsedJSON = JSON.parse(token)
       this.user = parsedJSON.user
       this.user = parsedJSON.user
       this.token = parsedJSON.token



    axios
      .get("http://localhost:4200/secret/",  { headers: { Authorization: this.token } })
      .then(value => {
        console.log("its value",value);
        this.data = value;
      
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

  methods: {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
