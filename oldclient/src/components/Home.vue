<template>
 <v-container fluid>
    <v-layout row wrap v-if="loggedIn">
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to Awesome App</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          You're Logged in as 
          <h2>{{user}}</h2>
        </blockquote>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to Awesome App</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          It's a basic Single Page application <br>
          with Google Firebase authentication
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/login">Sign In</v-btn>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      loggedIn: false,
      user: ''
    };
  },
  created: function() {
    var token = localStorage.getItem("token");
    if (localStorage.getItem("token") == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
       var token = localStorage.getItem("token")
       var parsedJSON = JSON.parse(token)
       this.user = parsedJSON.user

      //  console.log("I have it", parsedJSON, parsedJSON.user)

    }
  },

  methods: {

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
