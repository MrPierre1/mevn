<template>
 <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
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
                icon="face"
                required></v-text-field>
            </v-flex>
          
            <v-flex>
              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="text"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="onSave">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container> 



</template>

<script>
import axios from 'axios'
import { ifError } from 'assert';
import { userInfo } from 'os';
export default {
  name: 'CreateItem',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      email: '', 
      password: '',
      name: '',
     
    }
  },
  created: function created() {
  },
  methods: {
    onSave: function () {
      
      var newuser =  {
        username : this.username,
        email: this.email,
        password: this.password
      }

      if(!newuser.username || !newuser.email || !newuser.password){
        alert("Please try again")
      }
      axios.post('http://localhost:4200/users/signup', newuser).then( (value) =>{
      console.log("this is value", value);
        this.name = "value"
        alert("use saved")
    })

      console.log('Save', this.name, this.email)
    },
    onClear: function () {
      alert('clear')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
