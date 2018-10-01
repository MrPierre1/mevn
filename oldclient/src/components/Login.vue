<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Login</h1>
        <h3>You must login before you can proceed</h3>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="username"
                name="username"
                label="username"
                id="username"
                type="username"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="onSave">Login</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container> 

</template>

 <script>
import axios from "axios";
export default {
  name: "Login",

  data() {
    return {
      username: null,
      name: null,
      email: null,
      password: null,
      street: null,
      city: null,
      state: null,
      numtickets: 0,
      shirtsize: "XL"
    };
  },
  methods: {
    onSave: function() {
      var user = {
        username: this.username,
        password: this.password
      };

      if (!user.username || !user.password) {
        alert("Please try again");
        return;
      }

      axios
        .post("http://localhost:4200/users/login", user)
        .then(value => {
          console.log("this is value of current user", value, value.data);
          localStorage.setItem("token", JSON.stringify(value.data));
          alert("user is logged in");
          this.$router.push("/secretpage");
        })
        .catch(err => {
          alert("Invalid Credentials Please try again");
          console.log("There are errors: ", err);
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
