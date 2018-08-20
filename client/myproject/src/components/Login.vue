<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Login</h1>
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
 import axios from 'axios'
    export default {
      name: 'Login',

    data() {
    return {
        username:null,
        name:null,
        email:null,
        password:null,
        street:null,
        city:null,
        state:null,
        numtickets:0,
        shirtsize:'XL'
    }
  },
  methods:{
       onSave: function () {
      
      var user =  {
        username : this.username,
        password: this.password
      }
      axios.post('http://localhost:4200/users/login', user).then( (value) =>{
      console.log("this is value of current user", value);
        this.name = "value"
    })

      console.log('Save', this.name, this.email)
    },
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    submit() {
      alert('Submit to blah and show blah and etc.');      
    }
  }
      }
  </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
#app {
  background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
  background-size: cover;
  overflow: hidden;
}
.loginOverlay {
  background: rgba(33, 150, 243, 0.3);
}
.photoCredit {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.form2{
  width: 640px;
  margin: 0 20px;
}
</style>
